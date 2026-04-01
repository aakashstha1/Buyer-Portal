import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full bg-indigo-600 text-white py-2 cursor-pointer rounded-md font-semibold hover:bg-indigo-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
