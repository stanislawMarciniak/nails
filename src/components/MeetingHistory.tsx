import {
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableRowAccount from "./TableRowAccount";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { addHours, addMinutes, parse } from "date-fns";
import "./MeetingHistory.css";

const MeetingHistory = ({ user }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data, error } = await supabase
        .from("meetings")
        .select("*")
        .eq("user_id", user.id);

      // Sort meetings based on priorities:
      const sortedMeetings = data?.sort((a, b) => {
        const startHourA = parse(a.start_hour, "HH:mm:ss", new Date());
        const dateA = addMinutes(
          addHours(new Date(a.day), startHourA.getHours()),
          startHourA.getMinutes()
        );
        const startHourB = parse(b.start_hour, "HH:mm:ss", new Date());
        const dateB = addMinutes(
          addHours(new Date(b.day), startHourB.getHours()),
          startHourB.getMinutes()
        );

        return dateB - dateA;
      });

      setMeetings(sortedMeetings);
    };
    user && fetchMeetings();
  }, [user]);

  return (
    <TableContainer
      px={5}
      py={3}
      overflowY={"auto"}
      className="calendar-bg table-container"
      maxHeight={"sm"}
      w={"4xl"}
      shadow={"xl"}
    >
      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>
              <span className="text-secoundColor">Termin</span>
            </Th>
            <Th>
              <span className="text-secoundColor">Usługa</span>
            </Th>
            <Th>
              <span className="text-secoundColor">Status</span>
            </Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"sm"}>
          {meetings ? (
            meetings?.map((meeting, id) => (
              <TableRowAccount meeting={meeting} id={id} key={id} />
            ))
          ) : (
            <Text justifySelf={"center"}>Brak spotkań póki co :(</Text>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default MeetingHistory;
