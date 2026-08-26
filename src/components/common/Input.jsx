import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, hint, error, className = "", type = "text", ...props }, ref) => {
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
        <input
          id={id}
          type={type}
          aria-invalid={!!error}
          className={`w-full px-3 py-2 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 border outline-none transition-colors duration-150 focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20"
          } ${className}`}
          {...props}
          ref={ref}
        />
        {error ? (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        ) : (
          hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>
        )}
      </div>
    );
  }
);

export default Input;
