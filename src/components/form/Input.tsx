import { useFormContext } from 'react-hook-form';

type InputTypes =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'color'
  | 'date';

export function Input({
  name,
  labelText,
  type = 'text',
}: {
  name: string;
  labelText: string;
  type: InputTypes;
}) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      <div className="grid grid-cols-12 gap-2 mt-4">
        <label className="col-span-5 text-right" htmlFor={name}>
          {labelText}
        </label>
        <input
          className="col-start-6 col-end-13 border border-slate-600 px-1"
          type={type}
          id={name}
          {...register(name)}
        />
        {errors[name] && (
          <span className="col-start-6 col-end-13 text-red-800">
            {errors[name].message}
          </span>
        )}
      </div>
    </>
  );
}
