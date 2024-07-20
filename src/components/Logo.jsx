import React from "react";
const Logo = ({ className="" }) => {
  return <div className={`overflow-hidden w-14 bg-white/20 rounded-full ${className}`}>
    <img src="/icon.svg"  alt="Logo" className="p-2 rounded bg-transparent h-full w-full object-cover" />
    </div>;
};

export default Logo;
