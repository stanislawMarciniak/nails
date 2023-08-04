import { add, format } from "date-fns";
import {
  OPENING_HOURS_BEGINNING,
  OPENING_HOURS_END,
  OPENING_HOURS_INTERVAL,
} from "../constants/config";
import { Box, Stack } from "@chakra-ui/react";
import { formatMonthYear } from "./calendar/react-calendar/src/shared/dateFormatter";

const DayCalendar = ({ date, setDate, click, setClick }) => {
  console.log(date.justDate);
  formatMonthYear(locale, date);

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
    <Box p="10" className="shadow-xl calendar-bg">
      <Stack w="xl" className="gap-4">
        <button
          onClick={() => {
            setDate({ justDate: null, dateTime: null });
            setClick(!click);
          }}
        >
          wróć
        </button>
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
      </Stack>
    </Box>
  );
};

export default DayCalendar;
