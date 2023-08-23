import "./Calendar.css";
import { useEffect, useState } from "react";

import MonthCalendar from "../components/calendar/MonthCalendar";
import DayCalendar from "../components/calendar/DayCalendar";
import { useToast } from "@chakra-ui/react";
import { getUser } from "../config/supabaseClient";

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
  const toast = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();
      !user &&
        toast({
          title: "Zaloguj się.",
          description:
            "Aby umówić się na konkretną godzinę, musisz się zalogować.",
          status: "info",
          duration: 4000,
          isClosable: true,
        });
    };
    fetchUserData();
  }, []);

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
