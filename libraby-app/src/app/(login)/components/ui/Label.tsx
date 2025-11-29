import React from 'react';

interface LabelProps extends React.ComponentProps<'label'> {
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ className = '', children, ...props }) => {
  const baseClasses = 'block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 ml-1';

  return (
    <label
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};