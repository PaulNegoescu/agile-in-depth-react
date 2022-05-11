import clsx from 'clsx';

export function H1({ children, type, className, ...props }) {
  return (
    <h1
      className={clsx(
        'my-3 font-bold font-serif',
        {
          'text-3xl': type === 'primary' || !type,
          'text-2xl': type === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
