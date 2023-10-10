import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import {
  Center,
  Select,
  Stack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { addDays, startOfDay } from "date-fns";
import { pl } from "date-fns/locale";
import supabase from "../../config/supabaseClient";

const SelectDates = () => {
  const [dayType, setDayType] = useState("");
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const [state, setState] = useState([
    {
      startDate: startOfDay(new Date()),
      endDate: startOfDay(new Date()),
      key: "selection",
    },
  ]);
  const toast = useToast();
  const handleFull = async () => {
    const selectedDays = getDatesBetween(state[0]);

    try {
      await Promise.all(
        selectedDays.map(async (day) => {
          // Check if a record with the same "day" value exists
          const { data, error } = await supabase
            .from("special_days")
            .select("*")
            .eq("day", day);

          if (error) {
            throw new Error("Error occurred while querying data");
          }

          if (data.length === 0) {
            // If no record exists for the day, insert a new one
            await supabase.from("special_days").upsert([{ day, count: 3 }]);
          } else {
            // If a record exists for the day, update it
            await supabase
              .from("special_days")
              .upsert([{ day, count: 3 }])
              .eq("day", day);
          }
        })
      );

      toast({
        title: "Sukces.",
        description: "Zmieniono typ dni.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Błąd.",
        description: "Nie udało się zmienić typu dni.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleFree = async () => {
    const selectedDays = getDatesBetween(state[0]);

    try {
      let shouldUpdate = true;

      for (const day of selectedDays) {
        const { data: existingData, error } = await supabase
          .from("special_days")
          .select("count")
          .eq("day", day)
          .gt("count", 0) // Check if count is greater than 0
          .single();

        if (!error && existingData) {
          shouldUpdate = false;
          break;
        }
      }

      if (shouldUpdate) {
        const promises = selectedDays.map(async (day) => {
          const { data, error } = await supabase
            .from("special_days")
            .upsert({ day, count: -1 })
            .select("*");

          if (error) {
            throw new Error("Error occurred while processing data");
          }
        });

        await Promise.all(promises);

        toast({
          title: "Sukces.",
          description: "Zmieniono typ dni.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Błąd.",
          description: "W wybranym przedziale są umówione wizyty.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Błąd.",
        description: "Nie udało się zmienić typu dni.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleNormal = async () => {
    const selectedDays = getDatesBetween(state[0]);

    try {
      await Promise.all(
        selectedDays.map(async (day) => {
          const { data: special_daysData, error } = await supabase
            .from("special_days")
            .update({ count: 0 }) // Assuming 'day' is not being updated
            .eq("day", day);

          const { data: meetingsData, error: meetingsError } = await supabase
            .from("meetings") // You can specify multiple tables separated by a comma
            .delete()
            .eq("day", day);

          if (error || meetingsError) {
            throw new Error("Error occurred while processing data");
          }
        })
      );

      toast({
        title: "Sukces.",
        description: "Zmieniono typ dni.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Błąd.",
        description: "Nie udałos się zmienić typu dni.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const getDatesBetween = (range) => {
    const dates = [];
    let currentDate = new Date(range.startDate);

    while (currentDate <= range.endDate) {
      dates.push(currentDate.toString());
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleDayTypeChange = (event) => {
    setDayType(event.target.value);
  };

  const handleDaysUpdate = async () => {
    switch (dayType) {
      case "free":
        handleFree();
        break;
      case "full":
        handleFull();
        break;
      case "normal":
        handleNormal();
        break;

      default:
        toast({
          title: "Błąd.",
          description: "Wybierz typ dnia.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        break;
    }
  };

  return (
    <Center>
      <Stack align={"center"}>
        <DateRangePicker
          locale={pl}
          className="shadow-2xl date-range-picker"
          onChange={(item) => setState([item.selection])}
          minDate={addDays(new Date(), 1)}
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
          value={dayType}
          onChange={handleDayTypeChange}
        >
          <option value="free">Dni wolne od pracy</option>
          <option value="full">Dni zapełnione</option>
          <option value="normal">Dni całkowicie puste</option>
        </Select>
        <button
          className="px-8 pt-4 pb-3 mt-20 text-2xl rounded-full shadow-xl opacity-80 w-max bg-thirdColor josefin-light "
          type="button"
          onClick={handleDaysUpdate}
        >
          ZAPISZ
        </button>
      </Stack>
    </Center>
  );
};

export default SelectDates;
