import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AccountItem = ({ title, content, setUser, attribute, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(content);
  }, [content]);

  const handleChange = (e) => {
    onChange();
    setUser((user) => ({
      ...user,
      [attribute]: e.target.value,
    }));
    setValue(e.target.value);
  };

  const handleEdit = () => setIsEditing(!isEditing);

  const handleBlur = () => {
    setIsEditing(false);
    handleEdit();
  };

  return (
    <Box w={"full"}>
      <Text fontSize={{ base: "sm", lg: "md" }} mb={2}>
        {title}
      </Text>
      <Flex
        fontSize={{ base: "lg", lg: "initial" }}
        justify={"space-between"}
        align={"center"}
        py={{ base: 2, lg: 4 }}
        w={"full"}
        className="mb-2 shadow-lg calendar-bg josefin-light"
        onClick={handleEdit}
      >
        {isEditing ? (
          <Input
            my={-1}
            mx={4}
            fontSize={"xl"}
            bg={"transparent"}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <Text className="pl-6 josefin-normal">{content}</Text>
        )}
        <EditIcon mr={5} onClick={handleEdit} cursor={"pointer"} />
      </Flex>
    </Box>
  );
};

export default AccountItem;
