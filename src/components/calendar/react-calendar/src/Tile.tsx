import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import type {
  ClassName,
  TileClassNameFunc,
  TileContentFunc,
  TileDisabledFunc,
  View,
} from "./shared/types.js";
import supabase from "../../../../config/supabaseClient.js";
import { format, parse } from "date-fns";
import { formatLongDate } from "./shared/dateFormatter.js";

type TileProps = {
  activeStartDate: Date;
  children: React.ReactNode;
  classes?: string[];
  date: Date;
  formatAbbr?: (locale: string | undefined, date: Date) => string;
  locale?: string;
  maxDate?: Date;
  maxDateTransform: (date: Date) => Date;
  minDate?: Date;
  minDateTransform: (date: Date) => Date;
  onClick?: (date: Date, event: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (date: Date) => void;
  style?: React.CSSProperties;
  tileClassName?: TileClassNameFunc | ClassName;
  tileContent?: TileContentFunc | React.ReactNode;
  tileDisabled?: TileDisabledFunc;
  view: View;
};

export default function Tile(props: TileProps) {
  const {
    activeStartDate,
    children,
    classes,
    date,
    formatAbbr,
    locale,
    maxDate,
    maxDateTransform,
    minDate,
    minDateTransform,
    onClick,
    onMouseOver,
    style,
    tileClassName: tileClassNameProps,
    tileContent: tileContentProps,
    tileDisabled,
    view,
  } = props;

  const tileClassName = useMemo(() => {
    const args = { activeStartDate, date, view };

    return typeof tileClassNameProps === "function"
      ? tileClassNameProps(args)
      : tileClassNameProps;
  }, [activeStartDate, date, tileClassNameProps, view]);

  const tileContent = useMemo(() => {
    const args = { activeStartDate, date, view };

    return typeof tileContentProps === "function"
      ? tileContentProps(args)
      : tileContentProps;
  }, [activeStartDate, date, tileContentProps, view]);

  // const data = [
  //   { date: "23 sierpnia 2023", dateType: "full" },
  //   { date: "24 sierpnia 2023", dateType: "full" },
  //   { date: "25 sierpnia 2023", dateType: "full" },
  //   { date: "10 sierpnia 2023", dateType: "full" },
  //   { date: "20 września 2023", dateType: "freeDay" },
  //   { date: "20 sierpnia 2023", dateType: "freeDay" },
  //   { date: "13 sierpnia 2023", dateType: "freeDay" },
  //   { date: "6 sierpnia 2023", dateType: "freeDay" },
  //   { date: "27 sierpnia 2023", dateType: "freeDay" },
  // ];

  const [type, setType] = useState("");
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
          date: date,
          dateType: day.count === -1 ? "freeDay" : "full",
        };
      });
      setFormattedData(changedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const isDate = formattedData?.find(
      (data) => data.date === formatAbbr(locale, date)
    );
    const wasIt = minDate && minDateTransform(minDate) > date;
    const wasAlready = wasIt ? "wasAlready" : "";

    if (isDate) {
      setType(isDate.dateType + " " + wasAlready);
    } else {
      setType(wasAlready);
    }
  }, [formattedData]);

  return (
    <button
      className={clsx(classes, tileClassName) + " " + type}
      disabled={
        (minDate && minDateTransform(minDate) > date) ||
        (maxDate && maxDateTransform(maxDate) < date) ||
        (tileDisabled && tileDisabled({ activeStartDate, date, view })) ||
        type
      }
      onClick={onClick ? (event) => onClick(date, event) : undefined}
      onFocus={onMouseOver ? () => onMouseOver(date) : undefined}
      onMouseOver={onMouseOver ? () => onMouseOver(date) : undefined}
      style={style}
    >
      {formatAbbr ? (
        <abbr aria-label={formatAbbr(locale, date)}>{children}</abbr>
      ) : (
        children
      )}
      {tileContent}
    </button>
  );
}
