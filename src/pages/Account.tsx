import { Link } from "react-router-dom";
import supabase, { getUser } from "../config/supabaseClient";
import { Center, Flex, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AccountItem from "../components/AccountItem";

const Account = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };
    fetchUser();
    console.log(user);
  }, []);
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <Center>
      <Stack w={"6xl"} align={"center"} fontSize={"xl"}>
        <Text fontSize={"8xl"} className="pinyon">
          Moje Konto
        </Text>
        <Flex>
          <Stack w={"xl"}>
            <AccountItem
              title="IMIĘ I NAZWISKO"
              content={user?.name}
              setUser={setUser}
              attribute="name"
            />
            <AccountItem
              title="NUMER TELEFONU"
              content={user?.phone}
              setUser={setUser}
              attribute="phone"
            />
            <AccountItem
              title="EMAIL"
              content={user?.email}
              setUser={setUser}
              attribute="email"
            />
          </Stack>
        </Flex>
        <Flex gap={5}>
          <button className="px-6 py-2 mt-6 text-2xl rounded-full shadow-lg bg-firstColor">
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
