
const VARIANTS = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-slate-900 text-white hover:bg-slate-800",
  outline: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  bgColor,
  textColor,
  className = "",
  ...props
}) => {
  // bgColor/textColor kept for backward-compat call sites; explicit colors win over variant.
  const variantClasses = bgColor || textColor ? "" : VARIANTS[variant] || VARIANTS.primary;
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses} ${bgColor || ""} ${textColor || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
