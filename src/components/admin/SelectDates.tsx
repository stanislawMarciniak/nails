import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { Center, Select, Stack, useMediaQuery } from "@chakra-ui/react";
import { addDays } from "date-fns";
import { pl } from "date-fns/locale";

const SelectDates = () => {
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const getDatesBetween = (range) => {
    const dates = [];
    let currentDate = new Date(range.startDate);

    while (currentDate <= range.endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };
  return (
    <Center>
      <Stack align={"center"}>
        <DateRangePicker
          locale={pl}
          className="shadow-2xl date-range-picker"
          onChange={(item) => setState([item.selection])}
          minDate={new Date()}
          maxDate={addDays(new Date(), 100)}
          showSelectionPreview={false}
          moveRangeOnFirstSelection={false}
          months={isLargerThan1000 ? 2 : 1}
          ranges={state}
          direction={isLargerThan1000 ? "horizontal" : "vertical"}
          rangeColors={["#927979"]}
        />
        <Select
          placeholder="Wybierz typ dni"
          variant={"filled"}
          w={"2xs"}
          position={"relative"}
          right={"55%"}
          top={"4"}
          border={"1px"}
          opacity={0.5}
        >
          <option value="free">Dni wolne od pracy</option>
          <option value="full">Dni zapełnione</option>
          <option value="default">Dni całkowicie puste</option>
        </Select>
        <button
          className="px-8 pt-4 pb-3 mt-20 text-2xl rounded-full shadow-xl opacity-80 w-max bg-thirdColor josefin-light "
          type="button"
          onClick={() => console.log(getDatesBetween(state[0]))}
        >
          ZAPISZ
        </button>
      </Stack>
    </Center>
  );
};

export default SelectDates;
