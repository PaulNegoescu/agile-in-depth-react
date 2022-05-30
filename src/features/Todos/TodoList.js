import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { H1 } from '../../components/styled-components';
import { useAuthContext } from '../Auth/Auth.context';
import { TodoItem } from './TodoItem';
import { FormButton, Input } from '../../components';

const todoValidationSchema = object({
  title: string().required('Please provide a todo item.'),
});

export default function TodoList() {
  const [todos, setTodos] = useState(null);
  const { user, token } = useAuthContext();
  const methods = useForm({
    resolver: yupResolver(todoValidationSchema),
  });

  useEffect(() => {
    async function getTodos() {
      if (!user.id) {
        return;
      }

      const data = await fetch(
        `http://localhost:3500/todos?userId=${user.id}`
      ).then((res) => res.json());
      setTodos(data);
    }

    getTodos();
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

  function handleStatusChange(todoId, completed) {
    fetch(`http://localhost:3500/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
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
            />
          ))}
      </ul>
    </>
  );
}
