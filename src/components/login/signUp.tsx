import React, { useEffect, useState } from "react";

import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { isEmail } from "utils/validator";
import SideBanner from "./sideBanner";
import Link from "next/link";
import { SignUpMutation } from "services/auth";
import { useRouter } from "next/router";

interface Props {}

const SignUp = (props: Props) => {
  const toast = useToast();
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpData, setSignUpData] = useState<{
    name: string;
    password: string;
    email: string;
  }>({
    name: "",
    password: "",
    email: "",
  });
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleOnChange = (key: string, value: string) => {
    setSignUpData((prev) => {
      return {
        ...prev,
        [`${key}`]: value,
      };
    });
  };

  const cleanUpFunc = () => {
    setSignUpData({
      name: "",
      password: "",
      email: "",
    });
  };

  const SignUpService = async () => {
    try {
      const data = await SignUpMutation(signUpData);
      console.log(data);
      toast({
        title: "Signed Up Succussfully",
        status: "success",
        variant: "left-accent",
        isClosable: true,
      });
      router.push("/login");
    } catch (err: any) {
      toast({
        title: "User already exist with same email",
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!isEmail(signUpData.email)) {
      setIsValid(false);
      toast({
        title: `Please enter a valid email`,
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
      return;
    } else setIsValid(true);
    console.log("valid");

    setIsLoading(true);
    SignUpService();
  };

  useEffect(() => {
    () => {
      cleanUpFunc();
    };
  }, []);

  return (
    <Flex w={"full"} h="full">
      <SideBanner />
      <Flex
        align="center"
        justify="center"
        height={"full"}
        w={["full", "full", "45rem", "45rem"]}
        px="2rem"
        bgColor={"#E8EAEF"}
        flexDir="column"
      >
        <VStack
          w="full"
          p="2rem"
          borderRadius={"1rem"}
          bgColor={"white"}
          spacing={"5"}
        >
          <Flex w="full" justify={"start"} flexDir="column">
            <Text as="h2" fontWeight={500} color="black" my=".5rem">
              Sign Up
            </Text>
            <Text as="h4" color="black">
              Fill in the fields below to sign into your accound
            </Text>
          </Flex>

          <Input
            focusBorderColor="none"
            size="md"
            value={signUpData.name}
            onChange={(e) => {
              handleOnChange("name", e.target.value);
            }}
            placeholder={"Enter Username"}
          />

          <Flex w="full" flexDir={"column"}>
            <Input
              focusBorderColor="none"
              size="md"
              value={signUpData.email}
              onChange={(e) => {
                handleOnChange("email", e.target.value);
              }}
              placeholder={"Enter emailId"}
            />
            {isValid ? (
              <></>
            ) : (
              <Text as="p" fontSize={"0.8rem"} color="red">
                Please enter a valid email
              </Text>
            )}
          </Flex>

          <InputGroup focusBorderColor="none" size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={signUpData.password}
              onChange={(e) => {
                handleOnChange("password", e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {!show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex w="full" justify={"space-between"} align="center">
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              border="1px solid #4475d9"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>

            <Link href={"/login"} passHref={true}>
              <Text
                as="a"
                fontSize={["0.65rem", "0.65rem", "0.8rem", "0.8rem", "0.9rem"]}
                fontWeight="500"
                color="#4475d9"
              >
                Already have an account?
              </Text>
            </Link>
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default SignUp;
