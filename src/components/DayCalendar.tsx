import { add, format, set } from "date-fns";
import {
  OPENING_HOURS_BEGINNING,
  OPENING_HOURS_END,
  OPENING_HOURS_INTERVAL,
} from "../constants/config";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import getUserLocale from "get-user-locale";
import {
  formatLongDate,
  formatWeekday,
} from "./calendar/react-calendar/src/shared/dateFormatter";
import { CloseIcon } from "@chakra-ui/icons";
import Dropdown from "./Dropdown";
import { useState } from "react";
import { services } from "../config/data";

const DayCalendar = ({ date, setDate, click, setClick }) => {
  const [selectedService, setSelectedService] = useState("Wybierz usługę");
  const [selectedTime, setSelectedTime] = useState("Wybierz godzinę");
  const [active, setActive] = useState("");

  console.log(date.justDate);
  const locale = getUserLocale();

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

        <Dropdown
          data={clonedServices}
          selected={selectedService}
          setSelected={setSelectedService}
          active={active}
          setActive={setActive}
        />
        <Dropdown
          wasServiceChoosen={selectedService !== "Wybierz usługę"}
          isService={false}
          data={times}
          selected={selectedTime}
          setSelected={setSelectedTime}
          active={active}
          setActive={setActive}
          service={selectedService}
        />
        <Flex justify={"center"} mt={3}>
          <button
            className="px-8 py-3 text-2xl rounded-full bg-thirdColor josefin-light"
            type="button"
            onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
          >
            ZAPISZ MNIE
          </button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default DayCalendar;
