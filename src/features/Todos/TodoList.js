import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, set, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { H1 } from '../../components/styled-components';
import { useAuthContext } from '../Auth/Auth.context';
import { TodoItem } from './TodoItem';
import {
  FormButton,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useShowable,
} from '../../components';

const todoValidationSchema = object({
  title: string().required('Please provide a todo item.'),
});

export default function TodoList() {
  const [todos, setTodos] = useState(null);
  const modalProps = useShowable();

  const { user, token, logout } = useAuthContext();
  const methods = useForm({
    resolver: yupResolver(todoValidationSchema),
  });

  async function getTodos(userId) {
    if (!userId) {
      return;
    }

    const data = await fetch(
      `http://localhost:3500/todos?userId=${userId}`
    ).then((res) => res.json());
    setTodos(data);
  }

  useEffect(() => {
    getTodos(user.id);
  }, [user.id]);

  async function onSubmit({ title }) {
    const newTodo = {
      title,
      userId: user.id,
      completed: false,
    };

    const todo = await fetch('http://localhost:3500/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    setTodos((old) => [...old, todo]);
  }

  async function handleStatusChange(todoId, completed) {
    await fetch(`http://localhost:3500/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    getTodos(user.id);
  }

  async function handleDeleteItem(todoId) {
    try {
      await fetch(`http://localhost:3500/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            logout();
            throw new Error('Session token expired.');
          }
        }

        return res.json();
      });

      // setTodos(todos.filter((todo) => todo.id !== todoId));
      getTodos(user.id);
    } catch (e) {
      return null;
    }
  }

  async function handleDeleteAll() {
    modalProps.open();
    // if (
    //   !window.confirm('Are you sure you want to delete all completed todos?')
    // ) {
    //   return;
    // }
    return;
    const promises = todos
      .filter((todo) => todo.completed)
      .map((todo) =>
        fetch(`http://localhost:3500/todos/${todo.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

    await Promise.allSettled(promises);

    getTodos(user.id);
  }

  return (
    <>
      <H1>Todos</H1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <fieldset className="border p-2">
            <legend className="ml-2">Add Todos</legend>
            <Input
              name="title"
              type="text"
              labelText="What do you want to do?"
            />
            <FormButton>Add Todo</FormButton>
          </fieldset>
        </form>
      </FormProvider>
      <ul className="mt-4">
        {todos &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              onStatusChange={handleStatusChange}
              onDeleteItem={handleDeleteItem}
            />
          ))}
      </ul>
      <button
        className="bg-red-800 text-red-100 rounded px-2"
        onClick={handleDeleteAll}
      >
        Delete all completed
      </button>
      <Modal
        {...modalProps}
        close={() => {
          console.log('acum se inchide');
          modalProps.close();
        }}
      >
        <ModalHeader>
          <h2>Title of the modal</h2>
        </ModalHeader>
        <ModalContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse natus,
          eum perferendis quo voluptates numquam sequi modi. Perspiciatis,
          consequatur voluptates velit quisquam veniam distinctio eos fugit illo
          cumque? Itaque, est. Paul
        </ModalContent>
        <ModalFooter>
          <button onClick={modalProps.close}>Cancel</button>
          <button>Save</button>
        </ModalFooter>
      </Modal>
    </>
  );
}
