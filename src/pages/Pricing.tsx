import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { services } from "../config/data";

const Pricing = () => {
  return (
    <Center>
      <Stack w={"6xl"} mt={"16"}>
        <Center fontSize={"9xl"} className="pinyon">
          cennik
        </Center>
        <Accordion allowMultiple mt={10}>
          {services.map((service, id) => (
            <AccordionItem key={id}>
              <AccordionButton>
                <Flex
                  key={id}
                  className="josefin-light-nomral"
                  fontSize={"md"}
                  width="100%"
                >
                  <Box width="100%">
                    <AccordionIcon />
                    <strong className="josefin-normal">
                      {service.name.toUpperCase()}{" "}
                    </strong>
                    {id === services.length - 1 ||
                    id === services.length - 2 ||
                    id === services.length - 3 ? null : (
                      <span>
                        ({service.minTime}-{service.maxTime} H)
                      </span>
                    )}
                  </Box>
                  {id === services.length - 1 ? (
                    <Box width="100%">+{service.cost} ZŁ</Box>
                  ) : (
                    <Box width="100%">{service.cost} ZŁ</Box>
                  )}
                </Flex>
              </AccordionButton>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Center>
  );
};

export default Pricing;
