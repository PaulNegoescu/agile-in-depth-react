import { useState } from 'react';

export function Register() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    password_check: '',
    fName: '',
    lName: '',
  });

  function handleInputChange(e) {
    const val = e.target.value;
    setValues({
      ...values,
      [e.target.name]: val,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
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
          name="password_check"
          onChange={handleInputChange}
          value={values.password_check}
        />
      </div>
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
          name="fName"
          onChange={handleInputChange}
          value={values.fName}
        />
      </div>
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
          name="lName"
          onChange={handleInputChange}
          value={values.lName}
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
