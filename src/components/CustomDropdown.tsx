import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const CustomDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const options = ["Option 1", "Option 2", "Option 3"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Box
      w="200px"
      p="2"
      border="1px solid #ccc"
      borderRadius="md"
      position="relative"
      cursor="pointer"
    >
      <Text textAlign="center">{selectedOption}</Text>
      <Box
        position="absolute"
        top="100%"
        left="0"
        right="0"
        border="1px solid #ccc"
        borderRadius="md"
        background="white"
        display="none"
        _hover={{ display: "block" }}
      >
        {options.map((option, index) => (
          <Box
            key={index}
            p="2"
            textAlign="center"
            cursor="pointer"
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomDropdown;
