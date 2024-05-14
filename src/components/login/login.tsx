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
import { LoginMutation } from "services/auth";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import User, { UserToken } from "atom/user";
import axois from "../../services/axiosInstance";

interface Props {}

const LoginPage = (props: Props) => {
  const toast = useToast();
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(User);
  const setUserToken = useSetRecoilState(UserToken);

  const [signUpData, setSignUpData] = useState<{
    password: string;
    email: string;
  }>({
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

  const LoginService = async () => {
    try {
      const data: { token: string; userId: string; name: string } =
        await LoginMutation(signUpData);
      setUser((prev): any => {
        return {
          ...prev,
          email: signUpData.email,
          userId: data.userId,
          name: data.name,
        };
      });

      setUserToken(data);

      toast({
        title: "Signed Up Succussfully",
        status: "success",
        variant: "left-accent",
        isClosable: true,
      });
      router.push("/");
    } catch (err: any) {
      toast({
        title: err.message,
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const cleanUpFunc = () => {
    setSignUpData({
      password: "",
      email: "",
    });
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
    } else setIsValid(true);

    setIsLoading(true);
    LoginService();
  };

  useEffect(() => {
    () => {
      cleanUpFunc();
    };
  }, []);

  return (
    <>
      <Flex w={"full"} h="full">
        <SideBanner />
        <Flex
          align="center"
          justify="center"
          height={"full"}
          w={["full", "full", "45rem", "45rem"]}
          px="2rem"
          bgColor={"#E8EAEF"}
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
                Login
              </Text>
            </Flex>

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
                isDisabled={isLoading}
                isLoading={isLoading}
                border="1px solid #4475d9"
                onClick={handleSubmit}
              >
                Submit
              </Button>

              <Link href={"/signup"} passHref={true}>
                <Text
                  as="a"
                  fontSize={[
                    "0.65rem",
                    "0.65rem",
                    "0.8rem",
                    "0.8rem",
                    "0.9rem",
                  ]}
                  fontWeight="500"
                  color="#4475d9"
                >
                  Create a new account
                </Text>
              </Link>
            </Flex>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginPage;
