import { extendTheme } from "@chakra-ui/react";

import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    borderRadius: "none",
  },
});

const modalTheme = defineMultiStyleConfig({
  baseStyle,
});

const theme = extendTheme({
  colors: {
    firstColor: "#E1DDDD",
    secoundColor: "#927979",
    thirdColor: "#F4F4F4",
    fourthColor: "#C49494",
  },
  components: {
    Modal: modalTheme,
  },
  styles: {
    global: {
      body: {
        color: "#927979",
      },
    },
  },
});

export default theme;
