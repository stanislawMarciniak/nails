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
import supabase from "../../config/supabaseClient";

const DayCalendar = ({ date, setDate, click, setClick }) => {
  const [selectedService, setSelectedService] = useState("Wybierz usługę");
  const [selectedTime, setSelectedTime] = useState("Wybierz godzinę");
  const [active, setActive] = useState("");
  const [dayMeetings, setDayMeetings] = useState();

  const locale = getUserLocale();

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data, error } = await supabase
        .from("meetings")
        .select("*")
        .eq("day", date.justDate);
      setDayMeetings(data);
    };
    fetchMeetings();
  }, []);

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

  const [day, month] = formatLongDate(locale, date.justDate).split(" ");
  const weekday = formatWeekday(locale, date.justDate);

  const clonedServices = [...services];
  clonedServices.pop();
  const toast = useToast();

  const handleEnrollment = async () => {
    try {
      console.log(date.justDate);
      const { error } = await supabase.from("meetings").insert({
        day: date.justDate.toString(),
        start_hour: format(selectedTime.start, "kk:mm:ss"),
        end_hour: format(selectedTime.end, "kk:mm:ss"),
        service: selectedService.name,
      });

      if (error) {
        console.error("Error inserting meeting:", error);
      } else {
        toast({
          title: "Konto zostało utworzone.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (exception) {
      console.error("An unexpected error occurred:", exception);
    }
  };

  return (
    <Box p="10" className="mt-20 mb-10 shadow-xl calendar-bg josefin-light">
      <Stack w="xl" align={"center"}>
        <Flex w={"full"} mb={9} justify={"space-between"}>
          <Box />
          <Stack align={"center"}>
            <Text className="mb-4 text-7xl pinyon">
              {day} {month}
            </Text>
            <Text className="mb=3 text-4xl">{weekday}</Text>
          </Stack>

          <CloseIcon
            cursor={"pointer"}
            onClick={() => {
              setDate({ justDate: null, dateTime: null });
              setClick(!click);
            }}
          />
        </Flex>

        <DropdownService
          data={clonedServices}
          selected={selectedService}
          setSelected={setSelectedService}
          active={active}
          setActive={setActive}
          setSelectedTime={setSelectedTime}
        />
        <DropdownTime
          wasServiceChoosen={selectedService !== "Wybierz usługę"}
          data={times}
          selected={selectedTime}
          setSelected={setSelectedTime}
          active={active}
          setActive={setActive}
          service={selectedService}
          dayMeetings={dayMeetings}
        />
        <Flex justify={"center"} mt={3}>
          <button
            className="px-8 py-3 text-2xl rounded-full bg-thirdColor josefin-light"
            type="button"
            onClick={handleEnrollment}
          >
            ZAPISZ MNIE
          </button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default DayCalendar;
