import { addMinutes, format } from "date-fns";
import "./Dropdown.css";
import { useState } from "react";

const Dropdown = ({
  service = { maxTime: 1 },
  wasServiceChoosen = false,
  isService = true,
  selected,
  setSelected,
  data,
  active,
  setActive,
}) => {
  const [isChoosen, setIsChoosen] = useState(false);
  const [isTimeAlert, setIsTimeAlert] = useState(false);
  return (
    <div className="dropdown">
      <div
        className="flex justify-center dropdown-btn"
        onClick={() => {
          if (isService && active != "services") setActive("services");
          else if (!isService && active != "times")
            wasServiceChoosen ? setActive("times") : setIsTimeAlert(true);
          else setActive("");
        }}
      >
        <span className="text-xl josefin-light">
          {isChoosen
            ? isService
              ? selected.name.toUpperCase()
              : format(selected, "kk:mm") +
                " - " +
                format(addMinutes(selected, 60 * service.maxTime), "kk:mm")
            : selected.toUpperCase()}
        </span>
      </div>
      <span
        className={`${
          isTimeAlert && !wasServiceChoosen ? "opacity-1" : "opacity-0"
        } flex justify-center text-xl mt-3`}
      >
        wybierz najpierw usługę
      </span>

      {((active == "services" && isService) ||
        (active == "times" && !isService)) && (
        <div
          className={`${
            isService ? "" : "dropdown-content-times"
          } dropdown-content`}
        >
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
                  className="p-3 m-2 dropdown-item"
                >
                  {format(time, "kk:mm")} -{" "}
                  {format(addMinutes(time, 60 * service.maxTime), "kk:mm")}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
