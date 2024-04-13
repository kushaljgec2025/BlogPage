import React from "react";

function Container({ className, children }) {
  return (
    <div
      className={`w-full flex  flex-col  flex-wrap justify-center gap-10  items-center  px-4 mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
