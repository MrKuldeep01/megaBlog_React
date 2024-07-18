import React from "react";
const Logo = ({ className="overflow-hidden w-12 rounded-full" }) => {
  return <div className={className}>
    <img src="/vite.svg"  alt="Logo" className="p-2 rounded bg-transparent h-full w-full object-cover" />
    </div>;
};

export default Logo;
