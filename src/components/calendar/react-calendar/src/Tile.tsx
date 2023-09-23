import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import type {
  ClassName,
  TileClassNameFunc,
  TileContentFunc,
  TileDisabledFunc,
  View,
} from "./shared/types.js";
import { isSunday } from "date-fns";
import { IS_SUNDAY_NOT_WORKING } from "../../../../config/constants.js";

interface IFormattedDataItem {
  date?: string;
  dateType?: string;
}

type IForrmatedData = IFormattedDataItem[] | never[];

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
  formattedData: IForrmatedData;
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
    formattedData,
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

  const [type, setType] = useState("");

  useEffect(() => {
    const isDate = formattedData?.find(
      (data) => data.date === formatAbbr(locale, date)
    );
    const wasIt = minDate && minDateTransform(minDate) > date;
    const wasAlready = wasIt ? "wasAlready" : "";
    const sundayType = isSunday(date) && IS_SUNDAY_NOT_WORKING ? "freeDay" : "";
    console;

    setType(
      isDate
        ? wasAlready + " " + sundayType + " " + isDate.dateType
        : sundayType + " " + wasAlready
    );
  }, [formattedData, date, formatAbbr, locale, minDate, minDateTransform]);

  return (
    <button
      className={clsx(classes, tileClassName) + " " + type}
      disabled={
        ((minDate && minDateTransform(minDate) > date) ||
          (maxDate && maxDateTransform(maxDate) < date) ||
          (tileDisabled && tileDisabled({ activeStartDate, date, view })) ||
          type.includes("wasAlready") ||
          type.includes("full") ||
          type.includes("freeDay")) &&
        !type.includes("normal")
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
