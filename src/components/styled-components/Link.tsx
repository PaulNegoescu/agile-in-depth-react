import { Link as RouterLink, LinkProps } from 'react-router-dom';
import clsx from 'clsx';

export const Link: React.FunctionComponent<LinkProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <RouterLink
      className={clsx('text-tiffany-blue hover:underline', className)}
      {...rest}
    >
      {children}
    </RouterLink>
  );
};
