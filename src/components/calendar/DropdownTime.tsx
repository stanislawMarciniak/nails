import { addMinutes, format } from "date-fns";
import "./Dropdown.css";
import { useState } from "react";

const DropdownTime = ({
  service,
  wasServiceChoosen,
  selected,
  setSelected,
  data,
  active,
  setActive,
}) => {
  const [isChoosen, setIsChoosen] = useState(false);
  const [isTimeAlert, setIsTimeAlert] = useState(false);
  console.log(selected);
  // const formatTime = (data) => {
  //   const times = data.filter((time) => {
  //     return null;
  //   });
  // };
  return (
    <div className="dropdown">
      <div
        className="flex justify-center dropdown-btn"
        onClick={() => {
          if (active != "times")
            wasServiceChoosen ? setActive("times") : setIsTimeAlert(true);
          else setActive("");
        }}
      >
        <span className="text-xl josefin-light">
          {!isChoosen
            ? selected.toUpperCase()
            : format(selected.start, "kk:mm") +
              " - " +
              format(selected.end, "kk:mm")}
        </span>
      </div>
      <span
        className={`${
          isTimeAlert && !wasServiceChoosen ? "opacity-1" : "opacity-0"
        } flex justify-center text-xl mt-3`}
      >
        wybierz najpierw usługę
      </span>

      {active == "times" && (
        <div className="dropdown-content-times dropdown-content">
          {data.map((time, id) => (
            <div
              key={id}
              onClick={() => {
                setIsChoosen(true);
                setSelected({
                  start: time,
                  end: addMinutes(time, 60 * service.maxTime),
                });
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

export default DropdownTime;
