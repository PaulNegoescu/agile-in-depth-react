import clsx from 'clsx';

export function Paragraph({ children, className, ...props }) {
  return (
    <p className={clsx('my-2', className)} {...props}>
      {children}
    </p>
  );
}
