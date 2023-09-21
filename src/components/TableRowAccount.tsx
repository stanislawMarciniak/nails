import { Box, Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getUserLocale from "get-user-locale";
import {
  formatLongDate,
  formatWeekday,
} from "./calendar/react-calendar/src/shared/dateFormatter";
import { addHours, addMinutes, format, parse } from "date-fns";

const TableRowAccount = ({ meeting, id }) => {
  const [status, setStatus] = useState("");

  const locale = getUserLocale();
  const [day, month, year] = formatLongDate(locale, meeting.day).split(" ");
  const weekday = formatWeekday(locale, meeting.day);

  useEffect(() => {
    setStatus(meeting.status);
  }, []);

  const startHour = parse(meeting.start_hour, "HH:mm:ss", new Date());
  const endHour = parse(meeting.end_hour, "HH:mm:ss", new Date());

  const meetingDay = addMinutes(
    addHours(new Date(meeting.day), startHour.getHours()),
    startHour.getMinutes()
  );
  const transformStatus = () => {
    switch (status) {
      case "waiting":
        return meetingDay >= new Date() ? (
          <Box className="px-4 py-2 text-yellow-500 bg-yellow-200 rounded-md w-fit">
            Oczekiwanie...
          </Box>
        ) : (
          <Box className="px-4 py-2 text-yellow-300 bg-yellow-100 border border-yellow-300 rounded-md w-fit">
            Brak Odpowiedzi
          </Box>
        );
      case "accepted":
        return meetingDay >= new Date() ? (
          <Box className="px-4 py-2 text-green-500 bg-green-200 rounded-md w-fit">
            Zaakceptowano
          </Box>
        ) : (
          <Box className="px-4 py-2 text-green-300 bg-green-100 border border-green-300 rounded-md w-fit">
            Odbyło się
          </Box>
        );
      case "declined":
        return meetingDay >= new Date() ? (
          <Box className="px-4 py-2 text-red-500 bg-red-200 rounded-md w-fit">
            Odrzucono
          </Box>
        ) : (
          <Box className="px-4 py-2 text-red-300 bg-red-100 border border-red-300 rounded-md w-fit">
            Nie odbyło się
          </Box>
        );
      default:
        return meeting.status;
    }
  };
  const timeDifference = meetingDay.getTime() - new Date().getTime();
  const minutesDifference = Math.ceil(timeDifference / 1000);

  return (
    <Tr key={id}>
      <Td
        className={
          minutesDifference <= 48 * 3600 && minutesDifference >= 0
            ? "text-red-500"
            : ""
        }
      >{`${day} ${month} ${year} (${weekday}) ${format(startHour, "kk:mm")} -
          ${format(endHour, "kk:mm")}`}</Td>
      <Td>{meeting.service}</Td>
      <Td py={-2}>{transformStatus()}</Td>
    </Tr>
  );
};

export default TableRowAccount;
