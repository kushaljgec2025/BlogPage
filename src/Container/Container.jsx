import React from "react";

function Container({ className, children }) {
  return (
    <div className={`w-full flex gap-4 flex-wrap px-4 mx-auto ${className}`}>
      {children}
    </div>
  );
}

export default Container;
