import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Box, Flex, Stack } from "@chakra-ui/react";
import ReactCalendar from "./calendar/react-calendar/src/index";
import { addDays } from "date-fns";

const MonthCalendar = ({ setClick, setDate, click }) => {
  return (
    <Stack>
      <Box p="10" className="shadow-xl calendar-bg">
        <ReactCalendar
          nextLabel={<MdKeyboardArrowRight onClick={() => setClick(!click)} />}
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
            setDate((prev) => ({ ...prev, justDate: date }))
          }
        />
      </Box>
      <Flex justify={"space-around"} align={"center"}>
        <svg className="blob-svg">
          <image
            className="blob-image"
            href="../../public/images/calendar-blob2.svg"
          />
        </svg>
        <span>WOLNE TERMINY</span>
        <svg className="blob-svg">
          <image
            className="blob-image"
            href="../../public/images/calendar-blob3.svg"
          />
        </svg>
        <span>BRAK TERMINÓW</span>

        <svg className="blob-svg">
          <image
            className="blob-image"
            href="../../public/images/calendar-blob1.svg"
          />
        </svg>
        <span>DNI WOLNE OD PRACY</span>
      </Flex>
    </Stack>
  );
};

export default MonthCalendar;
