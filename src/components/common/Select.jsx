import { forwardRef, useId } from "react";

const Select = forwardRef(
  ({ label, className = "", options = [], ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="inline-block mb-1.5 text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <select
          id={id}
          className={`w-full px-3 py-2 rounded-lg bg-white text-slate-900 border border-slate-300 outline-none transition-colors duration-150 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${className}`}
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
