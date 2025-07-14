import React from "react";

function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content absolute  inset-[2px] rounded-lg bg-white/75  text-black ">
        {children}
      </div>
    </div>
  );
}

export default Card;
