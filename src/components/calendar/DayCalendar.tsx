import { add, format } from "date-fns";
import {
  OPENING_HOURS_BEGINNING,
  OPENING_HOURS_END,
  OPENING_HOURS_INTERVAL,
} from "../../config/constants";
import { Box, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import getUserLocale from "get-user-locale";
import {
  formatLongDate,
  formatWeekday,
} from "./react-calendar/src/shared/dateFormatter";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { services } from "../../config/data";
import DropdownService from "./DropdownService";
import DropdownTime from "./DropdownTime";
import supabase, { getUser } from "../../config/supabaseClient";

const DayCalendar = ({
  meeting,
  setMeeting,
  click,
  setClick,
  setIsSummary,
}) => {
  const [active, setActive] = useState("");
  const [dayMeetings, setDayMeetings] = useState();

  const locale = getUserLocale();

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data, error } = await supabase
        .from("meetings")
        .select("*")
        .eq("day", meeting.day);
      setDayMeetings(data);
    };
    fetchMeetings();
  }, []);

  const getTimes = () => {
    if (!meeting.day) return;

    const { day } = meeting;

    const beginning = add(day, { hours: OPENING_HOURS_BEGINNING });
    const end = add(day, { hours: OPENING_HOURS_END });
    const interval = OPENING_HOURS_INTERVAL;

    const times = [];
    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };
  const times = getTimes();

  const [day, month] = formatLongDate(locale, meeting.day).split(" ");
  const weekday = formatWeekday(locale, meeting.day);

  const clonedServices = [...services];
  clonedServices.pop();
  clonedServices.pop();
  const toast = useToast();

  const handleEnrollment = async () => {
    const user = await getUser();
    if (!user) {
      toast({
        title: "Zaloguj się.",
        description:
          "Aby umówić się na konkretną godzinę, musisz się zalogować.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    } else if (meeting.time === "Wybierz godzinę") {
      toast({
        title: "Wybierz usługę oraz godzinę.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      return;
    } else setIsSummary(true);
  };

  return (
    <Box
      w={{ base: "sm", lg: "initial" }}
      p={{ base: 0, lg: 10 }}
      py={{ base: 7, lg: 10 }}
      mt={{ base: 10, lg: 20 }}
      mb={{ base: 36, lg: 10 }}
      className="shadow-xl calendar-bg josefin-light"
    >
      <Stack w={{ base: "initial", lg: "xl" }} align={"center"}>
        <Flex w={{ base: "xs", lg: "full" }} mb={9} justify={"space-between"}>
          <Box />
          <Stack align={"center"}>
            <Text fontSize={{ base: "5xl", lg: "7xl" }} className="mb-4 pinyon">
              {day} {month}
            </Text>
            <Text className="mb=3 text-4xl">{weekday}</Text>
          </Stack>

          <CloseIcon
            cursor={"pointer"}
            onClick={() => {
              setMeeting({
                day: null,
                time: "Wybierz godzinę",
                service: "Wybierz usługę",
              });
              setClick(!click);
            }}
          />
        </Flex>

        <DropdownService
          data={clonedServices}
          selected={meeting.service}
          setMeeting={setMeeting}
          active={active}
          setActive={setActive}
        />
        <DropdownTime
          meeting={meeting}
          data={times}
          setMeeting={setMeeting}
          active={active}
          setActive={setActive}
          dayMeetings={dayMeetings}
        />
        <Flex justify={"center"} mt={3}>
          <button
            className="px-8 pt-4 pb-3 text-2xl rounded-full shadow-xl bg-thirdColor josefin-light"
            type="button"
            onClick={handleEnrollment}
          >
            DALEJ
          </button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default DayCalendar;
