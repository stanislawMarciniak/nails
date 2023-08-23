import "./Calendar.css";
import { useEffect, useState } from "react";

import MonthCalendar from "../components/calendar/MonthCalendar";
import DayCalendar from "../components/calendar/DayCalendar";
import { useToast } from "@chakra-ui/react";
import supabase from "../config/supabaseClient";

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
  const [isLogged, setIsLogged] = useState(false);
  const [isListening, setIsListening] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: user } = await supabase.auth.getUser();
        console.log(user);
        user && setIsLogged(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLogged(false);
      }
    };

    if (isListening) {
      const sessionListener = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN") {
            fetchUserData();
          } else if (event === "SIGNED_OUT") {
            setIsLogged(false);
          }
        }
      );

      return () => {
        sessionListener.data.subscription.unsubscribe();
      };
    }
  }, [isListening]);

  useEffect(() => {
    !isLogged &&
      toast({
        title: "Zaloguj się.",
        description:
          "Aby umówić się na konkretną godzinę, musisz się zalogować.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
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
