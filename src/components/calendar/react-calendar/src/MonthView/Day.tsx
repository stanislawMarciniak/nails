import React, { useEffect, useState } from "react";
import { getDayStart, getDayEnd } from "@wojtekmaj/date-utils";

import Tile from "../Tile.js";
import supabase from "../../../../../config/supabaseClient";

import { isWeekend } from "../shared/dates.js";
import {
  formatDay as defaultFormatDay,
  formatLongDate as defaultFormatLongDate,
} from "../shared/dateFormatter.js";
import { mapCalendarType } from "../shared/utils.js";

import type { CalendarType, DeprecatedCalendarType } from "../shared/types.js";

const className = "react-calendar__month-view__days__day";

type DayProps = {
  calendarType?: CalendarType | DeprecatedCalendarType;
  classes?: string[];
  currentMonthIndex: number;
  formatDay?: typeof defaultFormatDay;
  formatLongDate?: typeof defaultFormatLongDate;
} & Omit<
  React.ComponentProps<typeof Tile>,
  "children" | "formatAbbr" | "maxDateTransform" | "minDateTransform" | "view"
>;

export default function Day({
  calendarType: calendarTypeOrDeprecatedCalendarType,
  classes = [],
  currentMonthIndex,
  formatDay = defaultFormatDay,
  formatLongDate = defaultFormatLongDate,
  ...otherProps
}: DayProps) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("special_days")
        .select("*")
        .or("count.eq.-1,count.gte.3");

      const changedData = data?.map((day) => {
        const date = formatLongDate(locale, day.day);

        return {
          date,
          dateType: day.count === -1 ? "freeDay" : "full",
        };
      });
      setFormattedData(changedData);
    };

    fetchData();
  }, []);
  const calendarType = mapCalendarType(calendarTypeOrDeprecatedCalendarType);
  const { date, locale } = otherProps;

  const classesProps: string[] = [];

  if (classes) {
    classesProps.push(...classes);
  }

  if (className) {
    classesProps.push(className);
  }

  if (isWeekend(date, calendarType)) {
    classesProps.push(`${className}--weekend`);
  }

  if (date.getMonth() !== currentMonthIndex) {
    classesProps.push(`${className}--neighboringMonth`);
  }

  return (
    <Tile
      {...otherProps}
      classes={classesProps}
      formatAbbr={formatLongDate}
      maxDateTransform={getDayEnd}
      minDateTransform={getDayStart}
      view="month"
      formattedData={formattedData}
    >
      {formatDay(locale, date)}
    </Tile>
  );
}
