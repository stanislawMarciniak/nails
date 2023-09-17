import { Box, Center, Flex, Stack } from "@chakra-ui/react";
import { services } from "../config/data";

const Pricing = () => {
  return (
    <Center>
      <Stack w={"6xl"} mt={"16"}>
        <Center fontSize={"9xl"} className="pinyon">
          cennik
        </Center>
        <Box mt={"10"}>
          {services.map((service, id) => (
            <Flex
              justify={"space-between"}
              key={id}
              mt={"5"}
              className="josefin-light-nomral"
              fontSize={"xl"}
            >
              <Box>
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
                <Box>+{service.cost} ZŁ</Box>
              ) : (
                <Box>{service.cost} ZŁ</Box>
              )}
            </Flex>
          ))}
        </Box>
      </Stack>
    </Center>
  );
};

export default Pricing;
