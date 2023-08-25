import { add, addMinutes, format } from "date-fns";
import "./Dropdown.css";
import { useState } from "react";
import { OPENING_HOURS_END } from "../../config/constants";

const DropdownTime = ({
  service,
  wasServiceChoosen,
  selected,
  setSelected,
  data,
  active,
  setActive,
  dayMeetings,
}) => {
  const formatTime = (data) => {
    const times = data.filter((time) => {
      const endTime =
        time.getHours() + time.getMinutes() / 60 + service.maxTime;

      const fullEndTime = add(time, { minutes: service.maxTime * 60 });
      const interval = { start_hour: time, end_hour: fullEndTime };
      const isDataOverlapping = dayMeetings.some(
        (dataItem) =>
          new Date(dataItem.start_hour) >= interval.start_hour &&
          new Date(dataItem.start_hour) <= interval.end_hour
      );
      const doesNotOverlap =
        endTime <= OPENING_HOURS_END &&
        !isOverlap(time, dayMeetings) &&
        !isOverlap(fullEndTime, dayMeetings) &&
        !isDataOverlapping;

      return doesNotOverlap;
    });

    return times;
  };

  const isOverlap = (time, ranges) => {
    const currentTime = time.getTime();
    for (const range of ranges) {
      const startDateString = `${range.day.split(" ")[1]} ${
        range.day.split(" ")[2]
      } ${range.day.split(" ")[3]} ${range.start_hour}`;
      const endDateString = `${range.day.split(" ")[1]} ${
        range.day.split(" ")[2]
      } ${range.day.split(" ")[3]} ${range.end_hour}`;

      const startRange = new Date(startDateString);
      const endRange = new Date(endDateString);

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
          {selected === "Wybierz godzinę"
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
          {formatTime(data).length > 0 ? (
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
