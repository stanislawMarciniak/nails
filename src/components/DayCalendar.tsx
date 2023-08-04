import { add, format } from "date-fns";
import {
  OPENING_HOURS_BEGINNING,
  OPENING_HOURS_END,
  OPENING_HOURS_INTERVAL,
} from "../constants/config";
import { Box, Flex, Select, Stack, Text } from "@chakra-ui/react";
import getUserLocale from "get-user-locale";
import { formatLongDate } from "./calendar/react-calendar/src/shared/dateFormatter";
import { CloseIcon } from "@chakra-ui/icons";
import { services } from "../config/data";

const DayCalendar = ({ date, setDate, click, setClick }) => {
  const cloneServices = [...services];
  cloneServices.pop();
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

  const [day, month, year] = formatLongDate(locale, date.justDate).split(" ");

  const times = getTimes();
  return (
    <Box p="10" className="mb-10 shadow-xl calendar-bg josefin-light">
      <Stack w="4xl" gap={7}>
        <Flex justify={"space-between"}>
          <Box />
          <Stack align={"center"}>
            <Text className="mb-4 text-7xl pinyon">
              {day} {month}
            </Text>
            <Text className="mb=3 text-3xl">{year}</Text>
          </Stack>

          <CloseIcon
            cursor={"pointer"}
            onClick={() => {
              setDate({ justDate: null, dateTime: null });
              setClick(!click);
            }}
          />
        </Flex>
        {times?.map((time, i) => (
          <Flex align={"center"} justify={"center"} gap={8} mb={2}>
            <Text>{format(time, "kk:mm")}</Text>
            <Select variant={"filled"} bg={"#E1DDDD"} shadow={"md"} size={"lg"}>
              <option>Wybierz usługę</option>
              {cloneServices.map((service) => (
                <option value={service.name} key={service.name}>
                  {service.name}
                </option>
              ))}
            </Select>
          </Flex>
        ))}
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
