import ReactCalendar from "react-calendar";
import "./Calendar.css";
import { useState } from "react";
import { add, format } from "date-fns";
import {
  OPENING_HOURS_BEGINNING,
  OPENING_HOURS_END,
  OPENING_HOURS_INTERVAL,
} from "../constants/config";

interface DataType {
  justDate: Date | null;
  dateTime: Date | null;
}

const Calendar = () => {
  const [date, setDate] = useState<DataType>({
    justDate: null,
    dateTime: null,
  });

  console.log(date.dateTime);

  const getTimes = () => {
    if (!date.justDate) return;

    const { justDate } = date;

    const beginning = add(justDate, { hours: OPENING_HOURS_BEGINNING });
    const end = add(justDate, { hours: OPENING_HOURS_END });
    const interval = OPENING_HOURS_INTERVAL;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  return (
    <div className="flex flex-col items-center justify-center mt-36">
      {date.justDate ? (
        <div className="flex gap-4">
          {times?.map((time, i) => (
            <div key={i} className="p-2 bg-gray-200 rounded-md">
              <button
                type="button"
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
              >
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          view="month"
          onClickDay={(date) =>
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      )}
    </div>
  );
};

export default Calendar;
