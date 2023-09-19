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
      <Stack w={"6xl"} mt={"16"}>
        <Center fontSize={"9xl"} className="pinyon">
          cennik
        </Center>
        <Accordion allowToggle mt={10}>
          {services.map((service, id) => (
            <AccordionItem key={id}>
              <AccordionButton>
                <Flex width="100%" justify={"space-between"} fontSize={"lg"}>
                  <Box>
                    <AccordionIcon mr={6} />
                    <strong className="josefin-normal">
                      {service.name.toUpperCase()}{" "}
                    </strong>
                    {id === services.length - 1 ||
                    id === services.length - 2 ? null : service.minTime ===
                      service.maxTime ? (
                      <span>({service.minTime * 60} MIN)</span>
                    ) : (
                      <span>
                        ({service.minTime}-{service.maxTime} H)
                      </span>
                    )}
                  </Box>
                  <Box>{service.cost} ZŁ</Box>
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
