import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { Center, Select, Stack, useMediaQuery } from "@chakra-ui/react";
import { addDays } from "date-fns";

const SelectDates = () => {
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  console.log(state);
  return (
    <Center>
      <Stack>
        <DateRangePicker
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
        <Select placeholder="Wybierz typ dni" variant={"filled"} w={"2xs"}>
          <option value="option1">Dni wolne od pracy</option>
          <option value="option2">Dni zapełnione</option>
          <option value="option3">Dni całkowicie puste</option>
        </Select>
      </Stack>
    </Center>
  );
};

export default SelectDates;
