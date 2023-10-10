import { Box, Flex, Td, Tr, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import getUserLocale from "get-user-locale";
import {
  formatLongDate,
  formatWeekday,
} from "../calendar/react-calendar/src/shared/dateFormatter";
import { addHours, addMinutes, format, parse } from "date-fns";

const TableRow = ({ meeting, id }) => {
  const [user, setUser] = useState({});
  const [status, setStatus] = useState("");

  const locale = getUserLocale();
  const [day, month, year] = formatLongDate(locale, meeting.day).split(" ");
  const weekday = formatWeekday(locale, meeting.day);
  const toast = useToast();

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", meeting.user_id);

        setUser(data[0]);
      };
      fetchUser();
      setStatus(meeting.status);
    } catch (error) {
      toast({
        title: "Błąd.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, []);

  const handleStatusChange = async (e) => {
    try {
      if (e === "declined") {
        // Fetch the current count for the specified day
        const { data: specialDaysData, error: specialDaysError } =
          await supabase
            .from("special_days")
            .select("count")
            .eq("day", meeting.day);

        if (!specialDaysError && specialDaysData.length > 0) {
          const currentCount = specialDaysData[0].count;
          const newCount = currentCount - 1;

          // Update the "special_days" table with the decreased count
          await supabase
            .from("special_days")
            .update({ count: newCount })
            .eq("day", meeting.day);
        }
      }

      // Update the status in the "meetings" table
      const { error } = await supabase
        .from("meetings")
        .update({ status: e })
        .eq("id", meeting.id);

      setStatus(e);

      !error &&
        toast({
          title: "Sukces.",
          description: "Zmieniono status spotkania",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
    } catch (error) {
      toast({
        title: "Błąd.",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
          <Flex gap={5}>
            <button
              onClick={() => handleStatusChange("accepted")}
              className="px-4 py-2 text-green-500 bg-green-200 rounded-md"
            >
              Potwierdź
            </button>
            <button
              onClick={() => handleStatusChange("declined")}
              className="px-4 py-2 text-red-500 bg-red-200 rounded-md"
            >
              Odrzuć
            </button>
          </Flex>
        ) : (
          <Box className="px-4 py-2 text-gray-400 bg-gray-200 border border-gray-400 rounded-md w-fit">
            Przeoczone
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
    user && (
      <Tr key={id}>
        <Td>{user?.name}</Td>
        <Td>{user?.phone}</Td>
        <Td
          className={
            minutesDifference <= 48 * 3600 && minutesDifference >= 0
              ? "text-red-500"
              : ""
          }
        >{`${day} ${month} ${year} (${weekday}) ${format(startHour, "kk:mm")} -
          ${format(endHour, "kk:mm")}`}</Td>
        <Td>{meeting.service}</Td>
        <Td>{meeting.message ? meeting.message : "brak"}</Td>
        <Td py={-2}>{transformStatus()}</Td>
      </Tr>
    )
  );
};

export default TableRow;
