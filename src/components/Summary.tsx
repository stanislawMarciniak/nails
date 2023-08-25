import { format } from "date-fns";

import { Box, Flex, Stack, Text, useToast } from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

import supabase, { getUser } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Summary = ({ meeting, setMeeting, setIsSummary }) => {
  const [user, setUser] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  const handleEnrollment = async () => {
    try {
      const { error } = await supabase.from("meetings").insert({
        day: meeting.day.toString(),
        start_hour: format(meeting.time.start, "kk:mm:ss"),
        end_hour: format(meeting.time.end, "kk:mm:ss"),
        service: meeting.service.name,
      });
      if (error) {
        console.error("Error inserting meeting:", error);
      } else {
        navigate("/");
        toast({
          title: "Dodano spotkanie.",
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
            <Text className="mb-4 text-7xl pinyon">Podsumowanie</Text>
          </Stack>

          <CloseIcon
            cursor={"pointer"}
            onClick={() => {
              setMeeting((prev) => ({
                ...prev,
                time: "Wybierz godzinę",
                service: "Wybierz usługę",
              }));
              setIsSummary(false);
            }}
          />
        </Flex>
        <Text>IMIĘ I NAZWISKO: {user?.user_metadata?.name}</Text>
        <Text>NUMER TELEFONU: {user?.user_metadata?.phone}</Text>
        <Text>DATA: {meeting.day.toString()}</Text>
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

export default Summary;
