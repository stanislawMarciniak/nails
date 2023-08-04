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
  const [active, setActive] = useState(-1);

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

  const [day, month] = formatLongDate(locale, date.justDate).split(" ");
  const weekday = formatWeekday(locale, date.justDate);
  const clonedServices = services.map((service) => service.name);
  clonedServices.pop();

  const times = getTimes();
  const mappedTimes = times.map((time) => {
    format(time, "kk:mm");
  });
  console.log(mappedTimes);

  return (
    <Box p="10" className="mb-10 shadow-xl calendar-bg josefin-light">
      <Stack w="4xl" gap={7}>
        <Flex justify={"space-between"}>
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
          id={0}
          data={clonedServices}
          selected={selectedService}
          setSelected={setSelectedService}
          active={active}
          setActive={setActive}
        />
        <Dropdown
          id={1}
          data={mappedTimes}
          selected={selectedTime}
          setSelected={setSelectedTime}
          active={active}
          setActive={setActive}
        />
        <Flex justify={"end"} mt={3}>
          <button
            className="px-3 py-1 text-xl border rounded-full border-secoundColor bg-firstColor josefin-light"
            type="button"
            onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
          >
            Zapisz się
          </button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default DayCalendar;
