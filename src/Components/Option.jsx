import React from "react";
import { Link } from "react-router-dom";

function Option({ icon, title, isActive, path }) {
  return (
    <Link to={path}>
      <div className="option">
        <div className="option-icon">
          <img src={icon} alt="option-icon" />
        </div>
        <p className={`${isActive && "active-option"}`}>{title}</p>
      </div>
    </Link>
  );
}

export default Option;
