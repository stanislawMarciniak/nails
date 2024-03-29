export const OPENING_HOURS_BEGINNING = 9;
export const OPENING_HOURS_END = 22;
export const OPENING_HOURS_INTERVAL = 30; // in minutes
export const BREAK_TIME = 30; // in minutes
export const IS_SUNDAY_NOT_WORKING = true;

export const RESPONSIVENESS_1 = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
