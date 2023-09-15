import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const AccountItem = ({ title, content, setUser, attribute }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content);

  const handleEdit = () => {
    if (isEditing) {
      setUser((user) => ({
        ...user,
        [attribute]: value,
      }));
    }
    setIsEditing(!isEditing);
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleEdit();
  };

  return (
    <Box w={"full"}>
      <Text fontSize={"md"} mb={2}>
        {title}
      </Text>
      <Flex
        justify={"space-between"}
        align={"center"}
        py="4"
        w={"full"}
        className="mb-2 shadow-lg calendar-bg josefin-light"
      >
        {isEditing ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <Text className="pl-6 josefin-normal">{content}</Text>
        )}
        <EditIcon
          mr={5}
          onClick={handleEdit}
          cursor={"pointer"}
          color={isEditing ? "green.500" : "gray.500"}
        />
      </Flex>
    </Box>
  );
};

export default AccountItem;
