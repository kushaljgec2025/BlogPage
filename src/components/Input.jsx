import React, { useId } from "react";
import { forwardRef } from "react";
function Input({ label, type = "text", className = "", ...props }, ref) {
  const inputId = useId();
  return (
    <div className="text-left">
      {label && (
        <label htmlFor={inputId} className="   text-md text-gray font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        {...props}
        id={inputId}
        className={`shadow-sm focus:ring-blue focus:border-blue  px-4 py-2 block w-full sm:text-sm bg-slate-200 text-gray rounded-md ${className}`}
      />
    </div>
  );
}
export default forwardRef(Input);
