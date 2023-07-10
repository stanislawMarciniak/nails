import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "#927979",
        backgroundImage: "url(/public/images/bg-pricing.PNG)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
    },
  },
});

export default theme;
