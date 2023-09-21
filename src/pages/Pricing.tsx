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
import "./Pricing.css";

const Pricing = () => {
  return (
    <Center>
      <Stack w={"6xl"} mt={{ base: 4, lg: 16 }}>
        <Center
          fontSize={{ base: "6xl", sm: "7xl", lg: "9xl" }}
          className="pinyon"
        >
          cennik
        </Center>
        <Accordion allowToggle mt={{ base: 3, lg: 10 }}>
          {services.map((service, id) => (
            <AccordionItem key={id} mt={{ base: 4, lg: 0 }}>
              <AccordionButton pl={{ base: 4, lg: 6 }}>
                <Flex
                  width="100%"
                  justify={"space-between"}
                  fontSize={{ base: "sm", lg: "lg" }}
                  gap={5}
                >
                  <Flex>
                    <AccordionIcon mr={{ base: 2, lg: 6 }} ml={1} />
                    <Box
                      w={{ base: "initial", lg: "full" }}
                      className="break-normal"
                      textAlign={"left"}
                    >
                      <strong className="josefin-normal">
                        {service.name.toUpperCase()}{" "}
                      </strong>
                      {id === services.length - 1 ||
                      id === services.length - 2 ? null : service.minTime ===
                        service.maxTime ? (
                        <span>({service.minTime * 60} MIN)</span>
                      ) : (
                        <span style={{ whiteSpace: "nowrap" }}>
                          ({service.minTime}-{service.maxTime} H)
                        </span>
                      )}
                    </Box>
                  </Flex>
                  <Box style={{ whiteSpace: "nowrap" }} mr={2}>
                    {service.cost} ZŁ
                  </Box>
                </Flex>
              </AccordionButton>
              <AccordionPanel pb={4} fontSize={{ base: "xs", lg: "lg" }}>
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
