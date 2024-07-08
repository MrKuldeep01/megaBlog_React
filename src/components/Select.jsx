import React, { forwardRef, useId } from "react";

const Select = forwardRef(
  ({ label, className = "", options = [], ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && <label htmlFor={id}> {label}</label>}
        <select
          name={label}
          id={id}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          {...props}
          ref={ref}
        >
          {options?.map((elm) => (
            <option key={elm} value={elm}>
              {elm}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
