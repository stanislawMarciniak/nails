import ReactCalendar from "react-calendar";
import "./Calendar.css";

const Calendar = () => {
  return (
    <div>
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
