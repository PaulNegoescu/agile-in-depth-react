import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { H1 } from '../../components/styled-components';
import { useAuthContext } from '../Auth/Auth.context';
import { TodoItem } from './TodoItem';
import {
  FormButton,
  Input,
  Modal,
  ModalFooter,
  ModalHeader,
  useShowable,
} from '../../components';
import { useApi } from '../../hooks/useApi';

const todoValidationSchema = object({
  title: string().required('Please provide a todo item.'),
});

export default function TodoList() {
  const [todos, setTodos] = useState(null);
  const modalProps = useShowable();
  const { create, getAll, update, remove } = useApi('/todos');

  const { user } = useAuthContext();
  const methods = useForm({
    resolver: yupResolver(todoValidationSchema),
  });

  async function getTodos(userId) {
    if (!userId) {
      return;
    }

    const data = await getAll(`userId=${userId}`);
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

    const todo = await create(newTodo);

    setTodos((old) => [...old, todo]);
  }

  async function handleStatusChange(todoId, completed) {
    await update(todoId, { completed });

    getTodos(user.id);
  }

  async function handleDeleteItem(todoId) {
    await remove(todoId);

    getTodos(user.id);
  }

  async function handleDeleteAll() {
    modalProps.close();
    const promises = todos
      .filter((todo) => todo.completed)
      .map((todo) => remove(todo.id));

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
        onClick={modalProps.open}
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
          <H1>Do you really want to delete all completed items?</H1>
        </ModalHeader>
        <ModalFooter>
          <button onClick={modalProps.close}>Cancel</button>
          <button onClick={handleDeleteAll}>Save</button>
        </ModalFooter>
      </Modal>
    </>
  );
}
