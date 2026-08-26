const Logo = ({ className = "" }) => {
  return (
    <div
      className={`overflow-hidden w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex-shrink-0 ${className}`}
    >
      <img
        src="/icon.svg"
        alt="Logo"
        className="p-2 h-full w-full object-cover"
      />
    </div>
  );
};

export default Logo;
