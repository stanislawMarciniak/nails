import ReactCalendar from "react-calendar";
import "./Calendar.css";
import { useState } from "react";

interface DataType {
  justDate: Date | null;
  dateTime: Date | null;
}

const Calendar = () => {
  const [date, setDate] = useState<DataType>({
    justDate: null,
    dateTime: null,
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ReactCalendar
        className="react-calendar"
        minDate={new Date()}
        view="month"
        onClickDay={(date) => console.log(date)}
      />
    </div>
  );
};

export default Calendar;
