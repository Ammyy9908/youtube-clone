import React from "react";

function Option({ icon, title, isActive }) {
  return (
    <div className="option">
      <div className="option-icon">
        <img src={icon} alt="option-icon" />
      </div>
      <p className={`${isActive && "active-option"}`}>{title}</p>
    </div>
  );
}

export default Option;
