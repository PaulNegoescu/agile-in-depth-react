import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import { IAuthData, useAuthContext } from './Auth.context';
import { Input, FormButton } from 'components';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  email: string;
  password: string;
};

const loginValidationSchema = object({
  email: string()
    .required('Please enter an email address.')
    .email('Your email address does not seem valid.'),
  password: string()
    .required('Please enter a password')
    .min(6, 'Your password should be at least 6 characters long.'),
}).required();

export function Login() {
  const methods = useForm<FormData>({
    resolver: yupResolver(loginValidationSchema),
  });
  const [serverError, setServerError] = useState('');
  const { login, user } = useAuthContext();

  const location = useLocation();

  if (user) {
    const state = location.state as { from: string } | undefined;
    const destination = state?.from ?? '/dashboard';
    return <Navigate to={destination} />;
  }

  async function handleSubmit(formData: FormData) {
    const data: IAuthData = await fetch('http://localhost:3500/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (typeof data !== 'object') {
      setServerError(data);
      return;
    }
    login(data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
        <Input name="email" type="email" labelText="Email" />
        <Input name="password" type="password" labelText="Password" />
        <FormButton className="bg-purple-800">Sign In</FormButton>
      </form>
    </FormProvider>
  );
}
