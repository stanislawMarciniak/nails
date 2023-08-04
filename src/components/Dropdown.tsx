import { format } from "date-fns";
import "./Dropdown.css";
import { useState } from "react";

const Dropdown = ({
  isService = true,
  selected,
  setSelected,
  data,
  active,
  setActive,
}) => {
  const [isChoosen, setIsChoosen] = useState(false);
  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => {
          if (isService && active != "services") setActive("services");
          else if (!isService && active != "times") setActive("times");
          else setActive("");
        }}
      >
        <span className="fas fa-caret-down">
          {isChoosen
            ? isService
              ? selected.name
              : format(selected, "kk:mm")
            : selected}
        </span>
      </div>
      {((active == "services" && isService) ||
        (active == "times" && !isService)) && (
        <div className="dropdown-content">
          {isService
            ? data.map((service, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setIsChoosen(true);
                    setSelected(service);
                    setActive(!active);
                  }}
                  className="dropdown-item"
                >
                  {service.name}{" "}
                  <span>
                    ({service.minTime}-{service.maxTime}h)
                  </span>
                </div>
              ))
            : data.map((time, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setIsChoosen(true);
                    setSelected(time);
                    setActive(!active);
                  }}
                  className="dropdown-item"
                >
                  {format(time, "kk:mm")}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
