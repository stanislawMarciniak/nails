import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import {
  Box,
  Center,
  Flex,
  Spinner,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import ReactCalendar from "./react-calendar/src/index";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";

const MonthCalendar = ({ setClick, setMeeting, click }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <Center
          position="fixed"
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex="1000"
        >
          <Spinner size="xl" color="secondColor" />
        </Center>
      ) : (
        <Flex
          justify="center"
          align={{ base: "left", lg: "center" }}
          direction={{ base: "column", lg: "row" }}
        >
          <Box
            p={{ base: 4, lg: 10 }}
            position={"relative"}
            w={{ base: "sm", lg: "initial" }}
            className="shadow-xl calendar-bg"
          >
            <ReactCalendar
              nextLabel={
                <MdKeyboardArrowRight onClick={() => setClick(!click)} />
              }
              next2Label={
                <MdKeyboardDoubleArrowRight onClick={() => setClick(!click)} />
              }
              prevLabel={
                <MdKeyboardArrowLeft onClick={() => setClick(!click)} />
              }
              prev2Label={
                <MdKeyboardDoubleArrowLeft onClick={() => setClick(!click)} />
              }
              minDate={addDays(new Date(), 1)}
              view="month"
              onClickDay={(date) =>
                setMeeting((prev) => ({ ...prev, day: date }))
              }
            />
            {isLargerThan1000 && <BlobStack />}
          </Box>
          {!isLargerThan1000 && <BlobStack />}
        </Flex>
      )}
    </>
  );
};

const BlobStack = () => {
  return (
    <Stack
      spacing={{ base: 2, lg: 4 }}
      position={{ base: "initial", lg: "absolute" }}
      className="top-1/4 josefin-light"
      right={-80}
      mt={{ base: 5, lg: 0 }}
    >
      <Flex align="center">
        <svg className="blob-svg">
          <image className="blob-image" href="/images/calendar-blob2.svg" />
        </svg>
        <span>WOLNE TERMINY</span>
      </Flex>
      <Flex align="center">
        <svg className="blob-svg">
          <image className="blob-image" href="/images/calendar-blob3.svg" />
        </svg>
        <span>BRAK TERMINÓW</span>
      </Flex>
      <Flex align="center">
        <svg className="blob-svg">
          <image className="blob-image" href="/images/calendar-blob1.svg" />
        </svg>
        <span>DNI WOLNE OD PRACY</span>
      </Flex>
    </Stack>
  );
};

export default MonthCalendar;
