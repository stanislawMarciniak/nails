import { add, addMinutes, format } from "date-fns";
import "./Dropdown.css";
import { useState } from "react";
import { OPENING_HOURS_END } from "../../config/constants";

const DropdownTime = ({
  meeting,
  setMeeting,
  data,
  active,
  setActive,
  dayMeetings,
}) => {
  const formatTime = (data) => {
    const times = data.filter((time) => {
      const endTime =
        time.getHours() + time.getMinutes() / 60 + meeting.service.maxTime;

      const fullEndTime = add(time, { minutes: meeting.service.maxTime * 60 });
      const interval = { start_hour: time, end_hour: fullEndTime };
      const isDataOverlapping = dayMeetings.some((dataItem) => {
        const dataItemDate = new Date(dataItem.day);
        const dataStartParts = dataItem.start_hour.split(":");
        const dataStartHour = parseInt(dataStartParts[0]);
        const dataStartMinute = parseInt(dataStartParts[1]);

        dataItemDate.setHours(dataStartHour, dataStartMinute, 0, 0);

        return (
          dataItemDate >= interval.start_hour &&
          dataItemDate <= interval.end_hour
        );
      });
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

  const [isTimeAlert, setIsTimeAlert] = useState(false);
  return (
    <div className="dropdown">
      <div
        className="flex justify-center dropdown-btn"
        onClick={() => {
          if (active != "times")
            meeting.service !== "Wybierz usługę"
              ? setActive("times")
              : setIsTimeAlert(true);
          else setActive("");
        }}
      >
        <span className="text-xl josefin-light">
          {meeting.time === "Wybierz godzinę"
            ? meeting.time.toUpperCase()
            : format(meeting.time.start, "kk:mm") +
              " - " +
              format(meeting.time.end, "kk:mm")}
        </span>
      </div>
      <span
        className={`${
          isTimeAlert && meeting.service === "Wybierz usługę"
            ? "opacity-1"
            : "opacity-0"
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
                  setMeeting((prev) => ({
                    ...prev,
                    time: {
                      start: time,
                      end: addMinutes(time, 60 * meeting.service.maxTime),
                    },
                  }));
                  setActive(!active);
                }}
                className="m-1 dropdown-item"
              >
                {format(time, "kk:mm")} -{" "}
                {format(
                  addMinutes(time, 60 * meeting.service.maxTime),
                  "kk:mm"
                )}
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
