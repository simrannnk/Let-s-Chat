import { Avatar, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { ActiveUser } from "atom/chat";
import { CallData } from "atom/videoCall";
import React from "react";
import { FiMoreVertical, FiPhone } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface Props {}

const ChatBoxHeader = (props: Props) => {
  const activeUser = useRecoilValue(ActiveUser);
  const setCallData = useSetRecoilState(CallData);

  const handleCallClick = () => {
    setCallData((prev) => {
      return {
        ...prev,
        active: true,
      };
    });
  };

  return (
    <Flex
      w="full"
      p={"1rem 2rem"}
      h={"5rem"}
      alignItems={"center"}
      onClick={() => {}}
    >
      <Avatar
        cursor={"pointer"}
        height={"42px"}
        width={"42px"}
        mr={"10px"}
        src={`https://avatars.dicebear.com/api/pixel-art/${activeUser?.userId}.svg`}
        borderWidth={"2px"}
        borderColor={"white"}
        borderStyle="solid"
        name={"A"}
      />

      <Flex h="full" flex={1} flexDir="column" justify={"center"}>
        <Text
          as="h3"
          color={"black"}
          fontWeight="600"
          isTruncated
          width={"full"}
        >
          {activeUser?.name}
        </Text>
      </Flex>
      <HStack spacing={6} h="full" align={"center"}>
        <Icon
          onClick={() => {
            console.log("Click kra");
            handleCallClick();
          }}
          cursor={"pointer"}
          as={FiPhone}
          fontSize="1.5rem"
          color="black"
          fill={"black"}
        ></Icon>
        <Icon
          cursor={"pointer"}
          as={FiMoreVertical}
          fontSize="1.5rem"
          color="black"
          fill={"black"}
        ></Icon>
      </HStack>
    </Flex>
  );
};

export default ChatBoxHeader;
