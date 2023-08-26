import { Box, Text } from "@chakra-ui/react";

const SummaryItem = ({ title, content }) => {
  return (
    <Box w={"full"}>
      <Text fontSize={"md"} mb={2}>
        {title}
      </Text>
      <Box
        py="4"
        w={"full"}
        className="mb-2 shadow-lg calendar-bg josefin-light"
      >
        <Text className="pl-6 josefin-normal">{content}</Text>
      </Box>
    </Box>
  );
};

export default SummaryItem;
