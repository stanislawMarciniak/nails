import { Link } from "react-router-dom";
import supabase, { getUser } from "../config/supabaseClient";
import {
  Center,
  Flex,
  Stack,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AccountItem from "../components/account/AccountItem";
import MeetingHistory from "../components/account/MeetingHistory";

const Account = () => {
  const [user, setUser] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const { data, errorOne } = await supabase.auth.updateUser({
        data: { phone: user.phone, name: user.name },
        email: user.email,
      });

      if (errorOne) throw errorOne;

      const { errorTwo } = await supabase
        .from("users")
        .update({ name: user.name, email: user.email, phone: user.phone })
        .eq("id", user.id);

      if (errorTwo) throw errorTwo;
      else {
        setIsDirty(false);
        toast({
          title: "Konto zostało zaktualizowane.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Błąd.",
        description: "Podane dane są nieprawidłowe.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleItemChange = () => {
    setIsDirty(true);
  };

  return (
    <Center>
      <Stack
        w={"full"}
        align={"center"}
        fontSize={"xl"}
        mt={{ base: 4, lg: 12 }}
      >
        <Text
          mb={{ base: 2, lg: 8 }}
          fontSize={{ base: "6xl", lg: "8xl" }}
          className="pinyon"
        >
          Moje Konto
        </Text>
        <Flex
          gap={{ base: 8, lg: 16 }}
          direction={{ base: "column", lg: "row" }}
        >
          <Stack w={"xs"}>
            <AccountItem
              title="IMIĘ I NAZWISKO"
              content={user?.name}
              setUser={setUser}
              attribute="name"
              onChange={handleItemChange}
            />
            <AccountItem
              title="NUMER TELEFONU"
              content={user?.phone}
              setUser={setUser}
              attribute="phone"
              onChange={handleItemChange}
            />
            <AccountItem
              title="EMAIL"
              content={user?.email}
              setUser={setUser}
              attribute="email"
              onChange={handleItemChange}
            />
          </Stack>
          <MeetingHistory user={user} />
        </Flex>
        <Flex gap={5} mb={5}>
          <button
            onClick={handleUpdate}
            className={`px-6 py-2 mt-6 text-2xl rounded-full shadow-lg  ${
              isDirty ? "bg-thirdColor" : "bg-firstColor"
            }`}
            disabled={!isDirty}
          >
            ZAPISZ
          </button>
          <Link
            to="/zaloguj"
            onClick={handleLogout}
            className="px-6 py-2 mt-6 text-2xl rounded-full shadow-lg"
            style={{ background: "rgba(196, 148, 148, 0.4)" }}
          >
            WYLOGUJ SIĘ
          </Link>
        </Flex>
      </Stack>
    </Center>
  );
};

export default Account;
