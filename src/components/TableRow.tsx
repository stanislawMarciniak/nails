import { Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import getUserLocale from "get-user-locale";
import {
  formatLongDate,
  formatWeekday,
} from "./calendar/react-calendar/src/shared/dateFormatter";
import { format, parse } from "date-fns";

const TableRow = ({ meeting, id }) => {
  const [user, setUser] = useState({});

  const locale = getUserLocale();
  const [day, month, year] = formatLongDate(locale, meeting.day).split(" ");
  const weekday = formatWeekday(locale, meeting.day);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", meeting.user_id);

      setUser(data[0]);
    };
    fetchUser();
  }, []);

  const startHour = parse(meeting.start_hour, "HH:mm:ss", new Date());
  const endHour = parse(meeting.end_hour, "HH:mm:ss", new Date());

  return (
    user && (
      <Tr key={id}>
        <Td>{user?.name}</Td>
        <Td>{user?.phone}</Td>
        <Td>{`${day} ${month} ${year} (${weekday}) ${format(
          startHour,
          "kk:mm"
        )} -
          ${format(endHour, "kk:mm")}`}</Td>
        <Td>{meeting.service}</Td>
        <Td>{meeting.message ? meeting.message : "brak"}</Td>
        <Td>{meeting.status}</Td>
      </Tr>
    )
  );
};

export default TableRow;
