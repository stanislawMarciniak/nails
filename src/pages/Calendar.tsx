import ReactCalendar from "../components/calendar/react-calendar/src/index";
import "./Calendar.css";
import { useEffect, useState } from "react";
import { add, format } from "date-fns";
import {
  OPENING_HOURS_BEGINNING,
  OPENING_HOURS_END,
  OPENING_HOURS_INTERVAL,
} from "../constants/config";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Box, Flex } from "@chakra-ui/react";

interface DataType {
  justDate: Date | null;
  dateTime: Date | null;
}

const data = [
  { date: "23 sierpnia 2023", dateType: "full" },
  { date: "24 sierpnia 2023", dateType: "full" },
  { date: "25 sierpnia 2023", dateType: "full" },
  { date: "10 sierpnia 2023", dateType: "full" },
  { date: "20 września 2023", dateType: "not working" },
  { date: "27 sierpnia 2023", dateType: "not working" },
];

const Calendar = () => {
  const [click, setClick] = useState(true);
  const [date, setDate] = useState<DataType>({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    const timeElement = document.querySelector(
      ".react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from"
    );

    if (timeElement) {
      const labelText = timeElement.textContent;
      const [month, year] = labelText.split(" ");
      timeElement.innerHTML = `<span class="pinyon">${month}</span> <span>${year}</span>`;
    }

    data.map((data) => {
      const type = data.dateType;
      const abbr = document.querySelector(`abbr[aria-label="${data.date}"]`);
      if (abbr) {
        switch (type) {
          case "full":
            abbr.style.color = "white";
            abbr.parentElement.style.backgroundImage =
              'url("../../public/images/calendar-blob2.svg")';
            break;

          case "not working":
            abbr.parentElement.style.backgroundImage =
              'url("../../public/images/calendar-blob1.svg")';
            break;
        }
      }
    });
  }, [click]);

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
    <div className="flex flex-col items-center justify-center mt-14">
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
          <button
            onClick={() => {
              setDate({ justDate: null, dateTime: null });
              setClick(!click);
            }}
          >
            wróć
          </button>
        </div>
      ) : (
        <Box p="10" mr={36} className="calendar-bg">
          <ReactCalendar
            nextLabel={
              <MdKeyboardArrowRight onClick={() => setClick(!click)} />
            }
            next2Label={
              <MdKeyboardDoubleArrowRight onClick={() => setClick(!click)} />
            }
            prevLabel={<MdKeyboardArrowLeft onClick={() => setClick(!click)} />}
            prev2Label={
              <MdKeyboardDoubleArrowLeft onClick={() => setClick(!click)} />
            }
            minDate={new Date()}
            view="month"
            onClickDay={(date) =>
              setDate((prev) => ({ ...prev, justDate: date }))
            }
          />
        </Box>
      )}
      <Flex>
        <svg>
          <image href="../../public/images/calendar-blob1.svg" />
        </svg>
        <svg>
          <image href="../../public/images/calendar-blob2.svg" />
        </svg>
        <svg>
          <image href="../../public/images/calendar-blob3.svg" />
        </svg>
      </Flex>
    </div>
  );
};

export default Calendar;
