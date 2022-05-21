import React from "react";

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  type: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  onChange,
  type,
  error,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        {...props}
      />
      {error &&<div>{error}</div>}
    </div>
  );
};

export default Input;
