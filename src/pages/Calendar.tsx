import "./Calendar.css";
import { useEffect, useState } from "react";

import MonthCalendar from "../components/calendar/MonthCalendar";
import DayCalendar from "../components/calendar/DayCalendar";
import { useToast } from "@chakra-ui/react";
import { getUser } from "../config/supabaseClient";
import Summary from "../components/Summary";
import { Route } from "react-router-dom";

const Calendar = () => {
  const [click, setClick] = useState(true);
  const [isSummary, setIsSummary] = useState(false);
  const [meeting, setMeeting] = useState({
    day: null,
    time: "Wybierz godzinę",
    service: "Wybierz usługę",
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
      {meeting.day ? (
        isSummary ? (
          <Summary
            meeting={meeting}
            setMeeting={setMeeting}
            setIsSummary={setIsSummary}
          />
        ) : (
          <DayCalendar
            meeting={meeting}
            setMeeting={setMeeting}
            click={click}
            setClick={setClick}
            setIsSummary={setIsSummary}
          />
        )
      ) : (
        <MonthCalendar
          setClick={setClick}
          setMeeting={setMeeting}
          click={click}
        />
      )}
    </div>
  );
};

export default Calendar;
