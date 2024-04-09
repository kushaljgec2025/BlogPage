import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-slate-300",

  className = "",
  ...props
}) {
  return (
    <div>
      <button
        type={type}
        className={`px-4 py-2 my-2 rounded-full ${className}  ${bgColor} ring-slate-300 ring-2`}
        {...props}
      >
        <span className="text-black"> {children}</span>
      </button>
    </div>
  );
}

export default Button;
