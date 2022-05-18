import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './Auth.context';

export function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { login, user } = useAuthContext();

  if (user) {
    return <Navigate to="/" />;
  }

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await fetch('http://localhost:3500/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    // const { token, user } = data;
    login(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          className="w-4/12 text-right inline-block mr-2 mt-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="border border-slate-600"
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          value={values.email}
        />
      </div>
      <div>
        <label
          className="w-4/12 text-right inline-block mr-2 mt-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="border border-slate-600"
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
          value={values.password}
        />
      </div>
      <div>
        <span className="w-4/12 inline-block mr-2"></span>
        <button className="rounded bg-purple-800 text-white px-4 py-2 mt-2">
          Sign Up
        </button>
      </div>
    </form>
  );
}
