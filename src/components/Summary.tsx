import { format } from "date-fns";

import { Box, Flex, Stack, Text, useToast } from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

import supabase, { getUser } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  formatLongDate,
  formatWeekday,
} from "./calendar/react-calendar/src/shared/dateFormatter";
import getUserLocale from "get-user-locale";
import SummaryItem from "./SummaryItem";

const Summary = ({ meeting, setMeeting, setIsSummary }) => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEnrollment = async () => {
    try {
      const { error } = await supabase.from("meetings").insert({
        day: meeting.day.toString(),
        start_hour: format(meeting.time.start, "kk:mm:ss"),
        end_hour: format(meeting.time.end, "kk:mm:ss"),
        service: meeting.service.name,
        user_id: user.id,
        message: message,
      });
      if (!error) {
        navigate("/");
        toast({
          title: "Poczekaj na potwierdzenie.",
          description: 'Status spotkań znajdziesz w zakładce "Moje Konto"',
          status: "info",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (exception) {
      toast({
        title: "Błąd.",
        description: "Nie dodano spotkania.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error("An unexpected error occurred:", exception);
    }
  };
  const locale = getUserLocale();
  const [day, month] = formatLongDate(locale, meeting.day).split(" ");
  const weekday = formatWeekday(locale, meeting.day);

  return (
    <Stack
      mt={{ base: 0, lg: 8 }}
      w={{ base: "initial", lg: "xl" }}
      align={"center"}
      fontSize={{ base: "md", lg: "xl" }}
    >
      <Flex w={"full"} justify={"space-between"}>
        <Box />
        <Stack align={"center"}>
          <Text
            fontSize={{ base: "6xl", lg: "7xl" }}
            mb={{ base: 2, lg: 10 }}
            className="pinyon"
          >
            Podsumowanie
          </Text>
        </Stack>

        <CloseIcon
          w={{ base: 8, lg: 10 }}
          h={{ base: 8, lg: 10 }}
          className="p-2 shadow-xl calendar-bg"
          cursor={"pointer"}
          onClick={() => {
            setMeeting((prev) => ({
              ...prev,
              time: "Wybierz godzinę",
              service: "Wybierz usługę",
            }));
            setIsSummary(false);
          }}
        />
      </Flex>
      <SummaryItem title="IMIĘ I NAZWISKO" content={user?.name} />
      <SummaryItem title="NUMER TELEFONU" content={user?.phone} />
      <SummaryItem
        title="TERMIN"
        content={`${day} ${month} (${weekday}) ${format(
          meeting.time.start,
          "kk:mm"
        )} -
        ${format(meeting.time.end, "kk:mm")}`}
      />
      <SummaryItem
        title="USŁUGA ORAZ KOSZT"
        content={`${meeting.service.name} - ${meeting.service.cost}zł`}
      />
      <Box w={"full"}>
        <Text fontSize={"md"} mb={2}>
          UWAGI
        </Text>

        <textarea
          placeholder="Jeśli masz jakieś uwagi, śmiało pisz..."
          spellCheck={false}
          className="w-full py-2 pl-4 mb-2 text-2xl shadow-lg rounded-3xl calendar-bg josefin-light text-secoundColor"
          value={message}
          onChange={handleMessageChange}
        />
      </Box>

      <Flex justify={"center"} mt={1} mb="5">
        <button
          className="px-8 pt-4 pb-3 text-2xl rounded-full shadow-xl bg-thirdColor josefin-light "
          type="button"
          onClick={handleEnrollment}
        >
          ZAPISZ MNIE
        </button>
      </Flex>
    </Stack>
  );
};

export default Summary;
