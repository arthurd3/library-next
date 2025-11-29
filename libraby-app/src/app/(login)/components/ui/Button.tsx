import React from 'react';

interface ButtonProps extends React.ComponentProps<'button'> {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ className = '', children, ...props }) => {
  const baseClasses = 'w-full flex items-center justify-center py-3 px-4 bg-stone-800 hover:bg-stone-900 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-stone-600 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none';

  return (
    <button
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};