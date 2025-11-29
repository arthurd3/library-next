import React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  const baseClasses = 'w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-stone-600 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <input
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
};