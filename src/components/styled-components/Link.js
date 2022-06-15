import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

export function Link({ children, className, ...props }) {
  return (
    <RouterLink
      className={clsx('text-cyan-600 hover:underline', className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
