import "./Calendar.css";
import { useState } from "react";

import MonthCalendar from "../components/MonthCalendar";
import DayCalendar from "../components/DayCalendar";

interface DataType {
  justDate: Date | null;
  dateTime: Date | null;
}

const Calendar = () => {
  const [click, setClick] = useState(true);
  const [date, setDate] = useState<DataType>({
    justDate: null,
    dateTime: null,
  });

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {date.justDate ? (
        <DayCalendar
          date={date}
          setDate={setDate}
          click={click}
          setClick={setClick}
        />
      ) : (
        <MonthCalendar setClick={setClick} setDate={setDate} click={click} />
      )}
    </div>
  );
};

export default Calendar;
