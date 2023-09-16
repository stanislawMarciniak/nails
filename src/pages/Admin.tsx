import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableRow from "../components/TableRow";
import "./Admin.css";
import { addHours, addMinutes, parse } from "date-fns";

const Admin = () => {
  const [meetings, setMeetings] = useState([]);

  const [showPastDates, setShowPastDates] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      const { data, error } = await supabase.from("meetings").select("*");
      // Filter out past dates if showPastDates is false

      const filteredMeetings = showPastDates
        ? data
        : data.filter((meeting) => {
            const startHour = parse(meeting.start_hour, "HH:mm:ss", new Date());
            const meetingDay = addMinutes(
              addHours(new Date(meeting.day), startHour.getHours()),
              startHour.getMinutes()
            );
            return meetingDay >= new Date();
          });

      // Sort meetings based on priorities:
      const sortedMeetings = filteredMeetings?.sort((a, b) => {
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
        if (dateA >= new Date() && dateB >= new Date()) {
          // Priority 1: Meetings with status 'waiting'
          if (a.status === "waiting" && b.status !== "waiting") {
            return -1; // a should come before b
          } else if (a.status !== "waiting" && b.status === "waiting") {
            return 1; // b should come before a
          }

          // Priority 2: Dates that will come next (in ascending order)

          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
        }

        // Priority 3: Dates that have already passed (in ascending order of aging)
        return dateB - dateA;
      });

      setMeetings(sortedMeetings);
    };
    fetchMeetings();
  }, [showPastDates]);

  const toggleShowPastDates = () => {
    setShowPastDates((prevShowPastDates) => !prevShowPastDates);
  };

  return (
    <Box mx={16} mt={16}>
      <FormControl display="flex" mb={3} alignItems="center">
        <FormLabel mb="0">Pokazać minione spotkania?</FormLabel>
        <Switch checked={showPastDates} onChange={toggleShowPastDates} />
      </FormControl>
      <TableContainer
        px={5}
        py={3}
        overflowY={"auto"}
        className="calendar-bg table-container"
        maxHeight={"2xl"}
        shadow={"xl"}
      >
        <Table size="lg" variant={"simple"}>
          <Thead>
            <Tr>
              <Th>
                <span className="text-secoundColor">Imię i Nazwisko</span>
              </Th>
              <Th>
                <span className="text-secoundColor">Numer Telefonu</span>
              </Th>
              <Th>
                <span className="text-secoundColor">Termin</span>
              </Th>
              <Th>
                <span className="text-secoundColor">Usługa</span>
              </Th>
              <Th>
                <span className="text-secoundColor">Dodatkowe Info</span>
              </Th>
              <Th>
                <span className="text-secoundColor">Zaakceptuj / Odrzuć</span>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {meetings.map((meeting, id) => (
              <TableRow meeting={meeting} id={id} key={id} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Admin;