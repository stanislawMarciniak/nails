import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import "./Login.css";
import supabase from "../config/supabaseClient";

interface FormValues {
  email: string;
  password: string;
}

interface State {
  isLoading: boolean;
  error: string;
  values: FormValues;
}

const initValues: FormValues = {
  email: "",
  password: "",
};

const initState: State = {
  isLoading: false,
  error: "",
  values: initValues,
};

const Login = () => {
  const [state, setState] = useState<State>(initState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

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

  const handleLogin = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: "" }));

      const { user, error } = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log(user);
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignUp = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: "" }));

      const { user, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log(user);
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <Flex
      justify="space-between"
      alignItems="center"
      mt="10"
      className="relative"
    >
      <Box>
        <Box className="absolute flex flex-col items-center pb-20 ml-10 shadow-2xl left-64 top-10 photoram">
          <Image w="sm" src={"/public/images/pazy_home_1.jpg"} />
        </Box>
        <Box className="absolute flex flex-col items-center pb-20 shadow-2xl left-1/3 top-1/3 photoram">
          <Image w="xs" src={"/public/images/pazy_home_2.jpg"} />
        </Box>
        <Box className="absolute flex flex-col items-center pb-20 mr-10 shadow-2xl top-16 right-1/3 photoram">
          <Image w="2xs" src={"/public/images/pazy_home_3.jpg"} />
        </Box>
      </Box>
      <Box w="md" px="20" pb="12" pt="6" mr={36} className="login-bg">
        <Heading
          mb={3}
          fontWeight="light"
          fontSize="7xl"
          className="flex justify-center pinyon"
        >
          {isSignUp ? "nowe konto" : "logowanie"}
        </Heading>
        {error && (
          <Text color="red.300" my={4} fontSize="xl">
            {error}
          </Text>
        )}
        {isSignUp && (
          <Box>
            <FormControl mb={3} isInvalid={touched.email && !values.email}>
              <FormLabel fontSize="2xs">IMIĘ I NAZWISKO</FormLabel>
              <Input
                borderRadius="full"
                background="white"
                type="text"
                name="name"
                errorBorderColor="red.300"
                value={values.email}
                onChange={handleChange}
                onBlur={onBlur}
              />
            </FormControl>
            <FormControl
              mb={3}
              isRequired
              isInvalid={touched.email && !values.email}
            >
              <FormLabel fontSize="2xs">NUMER TELEFONU</FormLabel>
              <Input
                borderRadius="full"
                background="white"
                type="tel"
                name="tel"
                errorBorderColor="red.300"
                value={values.email}
                onChange={handleChange}
                onBlur={onBlur}
              />
            </FormControl>
          </Box>
        )}
        <FormControl isInvalid={touched.email && !values.email} mb={3}>
          <FormLabel fontSize="2xs">EMAIL</FormLabel>
          <Input
            borderRadius="full"
            background="white"
            type="email"
            name="email"
            errorBorderColor="red.300"
            value={values.email}
            onChange={handleChange}
            onBlur={onBlur}
          />
        </FormControl>

        <FormControl mb={3} isInvalid={touched.password && !values.password}>
          <FormLabel fontSize="2xs">HASŁO</FormLabel>
          <Input
            borderRadius="full"
            background="white"
            type="password"
            name="password"
            errorBorderColor="red.300"
            value={values.password}
            onChange={handleChange}
            onBlur={onBlur}
          />
        </FormControl>
        {isSignUp ? (
          <Box>
            <FormControl
              mb={3}
              isInvalid={touched.password && !values.password}
            >
              <FormLabel fontSize="2xs">POWTÓRZ HASŁO</FormLabel>
              <Input
                borderRadius="full"
                background="white"
                type="password"
                name="password"
                errorBorderColor="red.300"
                value={values.password}
                onChange={handleChange}
                onBlur={onBlur}
              />
            </FormControl>
            <Text mb={3} fontSize="2xs">
              <strong>*Pole obowiązkowe.</strong> Twojego numeru potrzebuje w
              razie pilnego kontaktu (coś nagłego się stało i potrzebuję odwołać
              lub przełozyć wizytę)
            </Text>
          </Box>
        ) : (
          <Text
            mb={3}
            cursor="pointer"
            textAlign="center"
            _hover={{ textDecoration: "underline" }}
            onClick={null}
          >
            Nie pamietasz hasła?
          </Text>
        )}
        <Button
          color="inherit"
          fontSize="xl"
          letterSpacing="widest"
          w="full"
          background="white"
          borderRadius="full"
          isLoading={isLoading}
          isDisabled={!values.password || !values.email}
          onClick={isSignUp ? handleSignUp : handleLogin}
        >
          {isSignUp ? "UTWÓRZ KONTO" : "ZALOGUJ SIĘ"}
        </Button>
        <Flex direction="row" alignItems="center" my={3}>
          <Divider flex={1} />
          <Text fontSize="xs" mx={2} color="gray.200">
            {isSignUp ? "Masz już konto?" : "Jesteś tu nowy?"}
          </Text>
          <Divider flex={1} />
        </Flex>
        <Button
          color="inherit"
          fontSize="xl"
          letterSpacing="widest"
          w="full"
          background="white"
          borderRadius="full"
          isLoading={isLoading}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "ZALOGUJ SIĘ" : "UTWÓRZ KONTO"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
