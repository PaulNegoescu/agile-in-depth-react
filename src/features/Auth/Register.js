import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './Auth.context';
import { object, ref, string } from 'yup';

const registerValidationSchema = object({
  email: string()
    .required('Please enter an email address.')
    .email('Your email address does not seem valid.'),
  password: string()
    .required('Please enter a password')
    .min(6, 'Your password should be at least 6 characters long.'),
  // password_check: string()
  //   .required('Please retype the password.')
  //   .test(
  //     'isRetypedPassword',
  //     'The passwords did not match',
  //     (value) => ref('password') === value
  //   ),
  password_check: string()
    .required('Please retype the password.')
    .oneOf([ref('password')], "The passwords don't match"),
  fName: string()
    .required('Please enter your first name.')
    .min(2, 'The first name should be at least 2 characters long.'),
  lName: string()
    .required('Please enter your last name')
    .min(2, 'The last name should be at least 2 characters long.'),
}).required();

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const { login } = useAuthContext();
  const navigate = useNavigate();

  async function onSubmit(formData) {
    const { password_check, ...payload } = formData;
    const data = await fetch('http://localhost:3500/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    // const { token, user } = data;
    login(data);
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register('email')}
        />
      </div>
      {errors.email && (
        <>
          <span className="w-4/12 inline-block mr-2"></span>
          <span className="text-red-800">{errors.email.message}</span>
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
          {...register('password')}
        />
      </div>
      {errors.password && (
        <>
          <span className="w-4/12 inline-block mr-2"></span>
          <span className="text-red-800">{errors.password.message}</span>
        </>
      )}
      <div>
        <label
          className="w-4/12 text-right inline-block mr-2 mt-2"
          htmlFor="password_check"
        >
          Retype Password
        </label>
        <input
          className="border border-slate-600"
          type="password"
          id="password_check"
          {...register('password_check')}
        />
      </div>
      {errors.password_check && (
        <>
          <span className="w-4/12 inline-block mr-2"></span>
          <span className="text-red-800">{errors.password_check.message}</span>
        </>
      )}
      <div>
        <label
          className="w-4/12 text-right inline-block mr-2 mt-2"
          htmlFor="fName"
        >
          First Name
        </label>
        <input
          className="border border-slate-600"
          type="text"
          id="fName"
          {...register('fName')}
        />
      </div>
      {errors.fName && (
        <>
          <span className="w-4/12 inline-block mr-2"></span>
          <span className="text-red-800">{errors.fName.message}</span>
        </>
      )}
      <div>
        <label
          className="w-4/12 text-right inline-block mr-2 mt-2"
          htmlFor="lName"
        >
          Last Name
        </label>
        <input
          className="border border-slate-600"
          type="text"
          id="lName"
          {...register('lName')}
        />
      </div>
      {errors.lName && (
        <>
          <span className="w-4/12 inline-block mr-2"></span>
          <span className="text-red-800">{errors.lName.message}</span>
        </>
      )}
      <div>
        <span className="w-4/12 inline-block mr-2"></span>
        <button className="rounded bg-purple-800 text-white px-4 py-2 mt-2">
          Sign Up
        </button>
      </div>
    </form>
  );
}
