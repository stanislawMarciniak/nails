import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface State {
  isLoading: boolean;
  error: string;
  values: FormValues;
}

const initValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const initState: State = {
  isLoading: false,
  error: "",
  values: initValues,
};

const Login = () => {
  const [state, setState] = useState<State>(initState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { values, isLoading, error } = state;

  const onBlur = ({
    target,
  }: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  return (
    <Center>
      <Box className="flex flex-col items-center pb-20 mx-10 my-16 shadow-2xl photoram">
        <Image
          w={"md"}
          src={"/public/images/pazy_home_1.jpg"}
          _hover={{ transform: "scale(0.9)" }}
          transition="transform 0.3s"
        />
      </Box>
      <Box className="w-1/2">
        <Heading mb={8}>Get In Touch</Heading>
        {error && (
          <Text color="red.300" my={4} fontSize="xl">
            {error}
          </Text>
        )}

        <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            errorBorderColor="red.300"
            value={values.name}
            onChange={handleChange}
            onBlur={onBlur}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={touched.email && !values.email}
          mb={5}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            errorBorderColor="red.300"
            value={values.email}
            onChange={handleChange}
            onBlur={onBlur}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={5}
          isRequired
          isInvalid={touched.subject && !values.subject}
        >
          <FormLabel>Subject</FormLabel>
          <Input
            type="text"
            name="subject"
            errorBorderColor="red.300"
            value={values.subject}
            onChange={handleChange}
            onBlur={onBlur}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={touched.message && !values.message}
          mb={5}
        >
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            rows={4}
            errorBorderColor="red.300"
            value={values.message}
            onChange={handleChange}
            onBlur={onBlur}
          />
          <FormErrorMessage>Required</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="pink"
          isLoading={isLoading}
          isDisabled={
            !values.name || !values.email || !values.subject || !values.message
          }
          onClick={null}
        >
          Submit
        </Button>
      </Box>
    </Center>
  );
};

export default Login;
