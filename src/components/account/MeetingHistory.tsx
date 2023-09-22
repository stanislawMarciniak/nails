import {
  Center,
  Spinner,
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
import supabase from "../../config/supabaseClient";
import { addHours, addMinutes, parse } from "date-fns";
import "./MeetingHistory.css";

const MeetingHistory = ({ user }) => {
  const [meetings, setMeetings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
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
      w={{ base: "xs", lg: "4xl" }}
      shadow={"xl"}
    >
      {isLoading ? (
        <Center w={"100%"} height={"80%"}>
          <Spinner size={"xl"} color={"secondColor"} />
        </Center>
      ) : (
        <>
          <Table variant={"simple"}>
            <Thead>
              <Tr>
                <Th>
                  <span className="text-secondColor">Termin</span>
                </Th>
                <Th>
                  <span className="text-secondColor">Usługa</span>
                </Th>
                <Th>
                  <span className="text-secondColor">Status</span>
                </Th>
              </Tr>
            </Thead>
            <Tbody fontSize={"sm"}>
              {meetings &&
                meetings?.map((meeting, id) => (
                  <TableRowAccount meeting={meeting} id={id} key={id} />
                ))}
            </Tbody>
          </Table>
          {!meetings && (
            <Center w={"100%"} height={"80%"}>
              Brak spotkań póki co :(
            </Center>
          )}
        </>
      )}
    </TableContainer>
  );
};

export default MeetingHistory;
