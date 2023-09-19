import "./Dropdown.css";
import { useState } from "react";

const DropdownService = ({ selected, setMeeting, data, active, setActive }) => {
  const [isChoosen, setIsChoosen] = useState(false);

  return (
    <div className="mb-6 dropdown ">
      <div
        className="flex justify-center dropdown-btn"
        onClick={() => {
          if (active != "services") setActive("services");
          else setActive("");
        }}
      >
        <span className="text-xl josefin-light">
          {isChoosen ? selected.name.toUpperCase() : selected.toUpperCase()}
        </span>
      </div>

      {active == "services" && (
        <div className=" dropdown-content dropdown-content-service">
          {data.map((service, id) => (
            <div
              key={id}
              onClick={() => {
                setIsChoosen(true);
                setMeeting((prev) => ({
                  ...prev,
                  service: service,
                  time: "Wybierz godzinę",
                }));
                setActive(!active);
              }}
              className="dropdown-item"
            >
              {service.name}{" "}
              <span>
                {service.minTime !== service.maxTime
                  ? `(${service.minTime}-${service.maxTime}h)`
                  : `(${service.maxTime * 60}min)`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownService;
