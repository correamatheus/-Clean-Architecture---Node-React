import React from 'react';
import clsx from 'clsx';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx('w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300', className)}
    />
  );
});
Input.displayName = 'Input';
