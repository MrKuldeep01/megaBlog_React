import React, { forwardRef, useId } from "react";

const Input = forwardRef(
  (
    { label, className = "px-4 py-2 rounded-md", type = "text", ...props },
    ref
  ) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && <label htmlFor="id" className="inline-block mb-1 px-1">{label}</label>}
        <input id={id} type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props} ref={ref} />
      </div>
    );
  }
);

export default Input;
