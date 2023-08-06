import { add, addMinutes, format } from "date-fns";
import "./Dropdown.css";
import { useState } from "react";
import { OPENING_HOURS_END } from "../../constants/config";

const DropdownTime = ({
  service,
  wasServiceChoosen,
  selected,
  setSelected,
  data,
  active,
  setActive,
}) => {
  const demoData = [
    {
      start:
        "Tue Aug 21 2023 09:00:00 GMT+0200 (czas środkowoeuropejski letni)",
      end: "Tue Aug 21 2023 11:30:00 GMT+0200 (czas środkowoeuropejski letni)",
    },
    {
      start:
        "Tue Aug 21 2023 13:00:00 GMT+0200 (czas środkowoeuropejski letni)",
      end: "Tue Aug 21 2023 15:00:00 GMT+0200 (czas środkowoeuropejski letni)",
    },
    {
      start:
        "Tue Aug 21 2023 18:00:00 GMT+0200 (czas środkowoeuropejski letni)",
      end: "Tue Aug 21 2023 21:00:00 GMT+0200 (czas środkowoeuropejski letni)",
    },
  ];

  const formatTime = (data) => {
    const times = data.filter((time) => {
      const endTime =
        time.getHours() + time.getMinutes() / 60 + service.maxTime;

      const fullEndTime = add(time, { minutes: service.maxTime * 60 });
      const interval = { start: time, end: fullEndTime };
      const isDataOverlapping = demoData.some(
        (dataItem) =>
          new Date(dataItem.start) >= interval.start &&
          new Date(dataItem.start) <= interval.end
      );
      console.log(isDataOverlapping);
      console.log(interval);
      const doesNotOverlap =
        endTime <= OPENING_HOURS_END &&
        !isOverlap(time, demoData) &&
        !isOverlap(fullEndTime, demoData) &&
        !isDataOverlapping;

      return doesNotOverlap;
    });

    return times;
  };

  const isOverlap = (time, ranges) => {
    const currentTime = time.getTime();
    for (const range of ranges) {
      const startRange = new Date(range.start).getTime();
      const endRange = new Date(range.end).getTime();
      if (currentTime >= startRange && currentTime <= endRange) {
        return true;
      }
    }
    return false;
  };
  const [isChoosen, setIsChoosen] = useState(false);
  const [isTimeAlert, setIsTimeAlert] = useState(false);
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
          {formatTime(data) ? (
            formatTime(data).map((time, id) => (
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
                className="m-1 dropdown-item"
              >
                {format(time, "kk:mm")} -{" "}
                {format(addMinutes(time, 60 * service.maxTime), "kk:mm")}
              </div>
            ))
          ) : (
            <span>Brak wolnych godzin na wybraną usługę</span>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownTime;
