
const Spinner = ({ className = "h-6 w-6", label }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-slate-500">
      <div
        className={`animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600 ${className}`}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default Spinner;
