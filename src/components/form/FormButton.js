import clsx from 'clsx';

export function FormButton({ children, className }) {
  return (
    <div className="grid grid-cols-12 mt-4">
      <button
        className={clsx(
          'col-start-6 col-span-3 rounded text-white bg-purple-800 px-4 py-2',
          className
        )}
      >
        {children}
      </button>
    </div>
  );
}
