import React from 'react';
import clsx from 'clsx';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'ghost' }> = ({
  children, className, variant = 'default', ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition',
        variant === 'default' && 'bg-indigo-600 text-white hover:bg-indigo-700',
        variant === 'ghost' && 'bg-transparent text-indigo-600 hover:bg-indigo-50',
        className
      )}
    >
      {children}
    </button>
  );
};
