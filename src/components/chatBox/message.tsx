import React, { FC } from "react";

import { Flex, Text, Icon, Avatar, Divider } from "@chakra-ui/react";
import Link from "next/link";
import moment from "moment";
import { useRecoilValue } from "recoil";
import User from "atom/user";
import { ActiveUser } from "atom/chat";
import { ChatMessageType } from "types/chat";

const Message: FC<{ Message: ChatMessageType }> = ({ Message }) => {
  const user = useRecoilValue(User);
  const activeUser = useRecoilValue(ActiveUser);
  const isUserSender = Message.from === user?._id;
  console.log(isUserSender, Message.from, user);
  return (
    <Flex
      width={"full"}
      maxW="100%"
      m={"10px 0"}
      flexDir={isUserSender ? "row-reverse" : "row"}
    >
      <Flex flexDir={"column"} ml="1rem" mr="0.5rem">
        <Avatar
          bgColor={"#4E426D"}
          height={"2.5rem"}
          src={`https://avatars.dicebear.com/api/pixel-art/${Message.from}.svg`}
          name={Message.from}
          width={"2.5rem"}
          cursor={"pointer"}
        />
        <Text color={"black"} fontSize="0.5rem" fontWeight={"600"}>
          {moment(Message?.createdAt).format("h:mm a")}
        </Text>
      </Flex>
      <Flex
        w={"fit-content"}
        bgColor={isUserSender ? "#4E426D" : "#F5F7FB"}
        borderRadius={"0.8rem"}
        borderTopRightRadius={isUserSender ? "none" : "0.8rem"}
        borderTopLeftRadius={!isUserSender ? "none" : "0.8rem"}
        p={"10px"}
        px="1rem"
        flexDir={"column"}
        pos={"relative"}
        align="start"
      >
        {/* {Message?.media && Message?.media.length > 0 ? (
          <Media isFeed={true} media={Message?.media} isChat={true} />
        ) : (
          <></>
        )} */}
        <Text
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          color={isUserSender ? "white" : "black"}
          fontSize={"1rem"}
          mb="0.5rem"
        >
          {Message?.name}
        </Text>
        {/* <Divider w="full" h="0.5px" color={!isUserSender ? "white" : "black"} /> */}
        <Text
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          color={isUserSender ? "white" : "black"}
          fontSize={"0.8rem"}
        >
          {Message?.msg}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Message;
