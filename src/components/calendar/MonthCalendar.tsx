import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import ReactCalendar from "./react-calendar/src/index";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";

const MonthCalendar = ({ setClick, setMeeting, click }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <>
      <Flex
        justify={"center"}
        align={"center"}
        display={isLoading ? "initial" : "none"}
        mt={"80"}
      >
        <Spinner size={"xl"} color={"secondColor"} />
      </Flex>
      <Flex
        display={isLoading ? "none" : "initial "}
        justify="center"
        align="center"
      >
        <Box p="10" position={"relative"} className="shadow-xl calendar-bg">
          <ReactCalendar
            nextLabel={
              <MdKeyboardArrowRight onClick={() => setClick(!click)} />
            }
            next2Label={
              <MdKeyboardDoubleArrowRight onClick={() => setClick(!click)} />
            }
            prevLabel={<MdKeyboardArrowLeft onClick={() => setClick(!click)} />}
            prev2Label={
              <MdKeyboardDoubleArrowLeft onClick={() => setClick(!click)} />
            }
            minDate={addDays(new Date(), 1)}
            view="month"
            onClickDay={(date) =>
              setMeeting((prev) => ({ ...prev, day: date }))
            }
          />
          <Stack
            spacing={4}
            position={"absolute"}
            className="top-1/4 josefin-light"
            right={-80}
          >
            <Flex align="center">
              <svg className="blob-svg">
                <image
                  className="blob-image"
                  href="/images/calendar-blob2.svg"
                />
              </svg>
              <span>WOLNE TERMINY</span>
            </Flex>
            <Flex align="center">
              <svg className="blob-svg">
                <image
                  className="blob-image"
                  href="/images/calendar-blob3.svg"
                />
              </svg>
              <span>BRAK TERMINÓW</span>
            </Flex>
            <Flex align="center">
              <svg className="blob-svg">
                <image
                  className="blob-image"
                  href="/images/calendar-blob1.svg"
                />
              </svg>
              <span>DNI WOLNE OD PRACY</span>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default MonthCalendar;
