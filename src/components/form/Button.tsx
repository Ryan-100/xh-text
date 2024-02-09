import React, { HTMLAttributes } from "react";

interface Ibutton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
  className?: string;
  id?: string;
  onClick?: () => void;
}

const Button: React.FC<Ibutton> = ({ className, children, id, onClick }) => {
  return (
    <button
      id={id}
      className={
        "text-sm  bg-primary rounded mb-1 text-white py-2 px-2 " + className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
