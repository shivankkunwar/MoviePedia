import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  const inputClasses = 'block bg-neutral-400 text-black  w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ';

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <input className={`${inputClasses} ${className} `} {...props} />
    </div>
  );
};

export default Input;

