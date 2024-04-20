import React, { useId, useState } from "react";
import { forwardRef } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();
  return (
    <div className="text-left ">
      {label && (
        <label htmlFor={inputId} className="   text-md text-gray font-semibold">
          {label}
        </label>
      )}
      <div className="flex justify-center items-center">
        <input
          type={showPassword ? "text" : type}
          ref={ref}
          {...props}
          id={inputId}
          className={`shadow-sm focus:ring-blue focus:border-blue  px-4 py-2 block w-full sm:text-sm bg-slate-300 text-black rounded-md ${className}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none mx-2"
          >
            {!showPassword ? <PiEye size={30} /> : <PiEyeClosed size={30} />}
          </button>
        )}
      </div>
    </div>
  );
}
export default forwardRef(Input);
