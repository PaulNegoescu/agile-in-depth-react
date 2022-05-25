import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useFormInput } from '../../hooks/useFormInput';
import { useAuthContext } from './Auth.context';

const validationRules = {
  email: [
    {
      /* eslint-disable no-control-regex */
      isValid: (value) =>
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(
          value
        ),
      message: 'Please provide a valid email address.',
    },
    {
      isValid: isRequiredPresent,
      message: 'Please provide an email address.',
    },
  ],
  password: [
    {
      isValid: isRequiredPresent,
      message: 'Please provide a password.',
    },
  ],
};

export function Login() {
  const { values, errors, getProps, isFormValid } = useFormInput(
    { email: '', password: '' },
    validationRules
  );
  const [serverError, setServerError] = useState('');
  const { login, user } = useAuthContext();

  const location = useLocation();

  if (user) {
    const destination = location.state.from ?? '/';
    return <Navigate to={destination} />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const data = await fetch('http://localhost:3500/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    // const { token, user } = data;
    if (typeof data !== 'object') {
      setServerError(data);
      return;
    }
    login(data);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
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
          {...getProps('email')}
        />
      </div>
      {errors.email && (
        <>
          <span className="w-4/12 inline-block mr-2"></span>
          <span className="text-red-800">{errors.email}</span>
        </>
      )}
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
          {...getProps('password')}
        />
      </div>
      {errors.password && (
        <>
          <span className="w-4/12 inline-block mr-2"></span>
          <span className="text-red-800">{errors.password}</span>
        </>
      )}
      <div>
        <span className="w-4/12 inline-block mr-2"></span>
        <button className="rounded bg-purple-800 text-white px-4 py-2 mt-2">
          Sign In
        </button>
      </div>
    </form>
  );
}

function isRequiredPresent(value) {
  if (value.trim() === '') {
    return false;
  }
  return true;
}
