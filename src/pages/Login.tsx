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
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import "./Login.css";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

interface FormValues {
  name: string;
  phone?: number;
  email: string;
  password: string;
  passwordRepeat: string;
}

interface State {
  isLoading: boolean;
  error: string;
  values: FormValues;
}

const initValues: FormValues = {
  name: "",
  email: "",
  password: "",
  passwordRepeat: "",
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
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isPasswordRepeatShown, setIsPasswordRepeatShown] =
    useState<boolean>(false);
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const toast = useToast();
  const { values, isLoading, error } = state;

  const onBlur = ({
    target,
  }: React.FocusEvent<HTMLInpuphoneement | HTMLTextAreaElement>) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInpuphoneement | HTMLTextAreaElement>) => {
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

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(error.message);
      } else {
        navigate("/");
        toast({
          title: "Pomyślnie zalogowano.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Błąd.",
        description: "Podany mail lub hasło jest niepoprawne.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setState((prev) => ({
        ...prev,
        error: "Podany mail lub hasło jest niepoprawne",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSignUp = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: "" }));

      if (values.password !== values.passwordRepeat) {
        toast({
          title: "Błąd.",
          description: "Podane hasła muszą być identyczne.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        throw new Error("Podane hasła muszą być identyczne");
      }

      const { data: existingUser, error: existingUserError } = await supabase
        .from("users")
        .select("email")
        .eq("email", values.email)
        .limit(1);

      if (existingUserError) {
        throw new Error(existingUserError.message);
      }

      if (existingUser !== null && existingUser.length > 0) {
        toast({
          title: "Konto istnieje.",
          description: "Konto z podanym mailem już istnieje.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        throw new Error("An account with this email already exists.");
      }

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            phone: values.phone,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      } else navigate("/");
      toast({
        title: "Konto zostało utworzone.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message }));
      if (error.message === "Password should be at least 6 characters") {
        toast({
          title: "Błąd.",
          description: "Hasło musi mieć conajmniej 6 znaków.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleForgottenPassword = () => {
    toast({
      title: "Ups.",
      description: "Musisz sobie przypomnieć hasło lub utworzyć nowe konto.",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Flex
      justifyContent={{ base: "center", lg: "space-between" }}
      alignItems="center"
      mt={{ base: 5, lg: 20 }}
      className="relative"
      h={{ base: "initial", lg: "2xl" }}
    >
      {isLargerThan1000 && (
        <Box>
          <Box className="absolute top-0 flex flex-col items-center ml-10 shadow-2xl left-64 photoram-sm">
            <Image w="sm" src={"/images/pazy_home_1.jpg"} />
          </Box>
          <Box className="absolute flex flex-col items-center shadow-2xl left-1/3 top-44 photoram-xs">
            <Image w="xs" src={"/images/pazy_home_2.jpg"} />
          </Box>
          <Box className="absolute flex flex-col items-center mr-10 shadow-2xl top-16 right-1/3 photoram-2xs">
            <Image w="2xs" src={"/images/pazy_home_3.jpg"} />
          </Box>
        </Box>
      )}
      <Box
        w={{ base: "xs", lg: "md" }}
        pb="12"
        pt={{ base: 0, lg: 6 }}
        mr={{ base: 0, lg: 32 }}
        className={isLargerThan1000 ? "login-bg" : ""}
        px={{ base: 2, lg: 20 }}
      >
        <Heading
          mb={3}
          fontWeight="light"
          fontSize="7xl"
          className="flex justify-center pinyon"
        >
          {isSignUp ? "nowe konto" : "logowanie"}
        </Heading>
        {isSignUp && (
          <Box>
            <FormControl mb={3} isInvalid={touched.name && !values.name}>
              <FormLabel fontSize="2xs">IMIĘ I NAZWISKO</FormLabel>
              <Input
                borderRadius="full"
                background="white"
                type="text"
                name="name"
                errorBorderColor="red.300"
                value={values.name}
                onChange={handleChange}
                onBlur={onBlur}
              />
            </FormControl>
            <FormControl
              mb={3}
              isRequired
              isInvalid={touched.phone && !values.phone}
            >
              <FormLabel fontSize="2xs">NUMER TELEFONU</FormLabel>
              <Input
                borderRadius="full"
                background="white"
                type="phone"
                name="phone"
                errorBorderColor="red.300"
                value={values.phone ?? ""}
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

        <FormControl mb={7} isInvalid={touched.password && !values.password}>
          <FormLabel fontSize="2xs">HASŁO</FormLabel>
          <Input
            borderRadius="full"
            background="white"
            type={isPasswordShown ? "text" : "password"}
            name="password"
            errorBorderColor="red.300"
            value={values.password}
            onChange={handleChange}
            onBlur={onBlur}
            position={"absolute"}
          />
          {isPasswordShown ? (
            <BsFillEyeFill
              className="relative z-10 text-2xl cursor-pointer left-64 top-2 text-firstColor"
              onClick={() => setIsPasswordShown(!isPasswordShown)}
            />
          ) : (
            <BsFillEyeSlashFill
              className="relative z-10 text-2xl cursor-pointer left-64 top-2 text-firstColor"
              onClick={() => setIsPasswordShown(!isPasswordShown)}
            />
          )}
        </FormControl>
        {isSignUp ? (
          <Box>
            <FormControl
              mb={6}
              isInvalid={touched.passwordRepeat && !values.passwordRepeat}
            >
              <FormLabel fontSize="2xs">POWTÓRZ HASŁO</FormLabel>
              <Input
                borderRadius="full"
                background="white"
                type={isPasswordRepeatShown ? "text" : "password"}
                name="passwordRepeat"
                errorBorderColor="red.300"
                value={values.passwordRepeat}
                onChange={handleChange}
                onBlur={onBlur}
                position={"absolute"}
              />
              {isPasswordRepeatShown ? (
                <BsFillEyeFill
                  className="relative z-10 text-2xl cursor-pointer left-64 top-2 text-firstColor"
                  onClick={() =>
                    setIsPasswordRepeatShown(!isPasswordRepeatShown)
                  }
                />
              ) : (
                <BsFillEyeSlashFill
                  className="relative z-10 text-2xl cursor-pointer left-64 top-2 text-firstColor"
                  onClick={() =>
                    setIsPasswordRepeatShown(!isPasswordRepeatShown)
                  }
                />
              )}
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
            onClick={handleForgottenPassword}
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
          isDisabled={
            !isSignUp
              ? !values.password || !values.email
              : !values.password ||
                !values.email ||
                !values.passwordRepeat ||
                !values.phone
          }
          onClick={isSignUp ? handleSignUp : handleLogin}
        >
          {isSignUp ? "UTWÓRZ KONTO" : "ZALOGUJ SIĘ"}
        </Button>

        <Flex
          direction="row"
          alignItems="center"
          my={3}
          color={{ base: "inherit", lg: "gray.200" }}
        >
          <Divider flex={1} />
          <Text fontSize="xs" mx={2}>
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
