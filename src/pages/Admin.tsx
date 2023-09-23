import { useEffect, useState } from "react";

import { getUser } from "../config/supabaseClient";
import "./Admin.css";
import SelectDates from "../components/admin/SelectDates";
import MeetingsTable from "../components/admin/MeetingsTable";
import {
  Center,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

const Admin = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    };
    fetchUser();
  }, []);

  return user?.role === "admin" ? (
    <Tabs position="relative" variant="unstyled">
      <TabList>
        <Tab>Spotkania</Tab>
        <Tab>Oznacz Dni</Tab>
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="secondColor"
        borderRadius="1px"
      />
      <TabPanels>
        <TabPanel>
          <MeetingsTable />
        </TabPanel>
        <TabPanel>
          <SelectDates />
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ) : (
    <Center mt={20} fontSize={{ base: "xl", lg: "4xl" }}>
      Brak uprawnien administratora
    </Center>
  );
};

export default Admin;
