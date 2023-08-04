import { useState } from "react";
import "./Dropdown.css";

const Dropdown = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        Choose One
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          <div className="dropdown-item">React</div>
          <div className="dropdown-item">Vue</div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
