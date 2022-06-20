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
    <div className="flex flex-col gap-1 text-left mb-6">
      <label className="text-sm" htmlFor={name}>
        {labelText}
      </label>
      <input
        className="text-sm rounded border border-steel-gray px-2 py-3 focus:bg-quiz-purple focus:text-white"
        type={type}
        id={name}
        {...register(name)}
      />
      {errors[name] && (
        <span className="text-red-800">{errors[name].message}</span>
      )}
    </div>
  );
}
