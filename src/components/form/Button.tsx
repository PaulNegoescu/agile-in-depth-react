import React from 'react';
import clsx from 'clsx';

export const Button: React.FunctionComponent<
  React.ComponentPropsWithoutRef<'button'>
> = ({ children, className, ...rest }) => {
  return (
    <button
      className={clsx('col-start-6 col-span-3 rounded px-4 py-2', className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export const PrimaryButton: React.FunctionComponent<
  React.ComponentPropsWithoutRef<'button'>
> = ({ children, className, ...rest }) => {
  return (
    <Button className={clsx('bg-quiz-purple text-white', className)} {...rest}>
      {children}
    </Button>
  );
};

export const SecondaryButton: React.FunctionComponent<
  React.ComponentPropsWithoutRef<'button'>
> = ({ children, className, ...rest }) => {
  return (
    <Button className={clsx('bg-steel-gray text-white', className)} {...rest}>
      {children}
    </Button>
  );
};
