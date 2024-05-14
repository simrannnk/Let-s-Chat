import { Flex, Icon, Input, useOutsideClick } from "@chakra-ui/react";
import Emoji from "common/emoji";
import React, { KeyboardEvent, useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { FiSend, FiSmile } from "react-icons/fi";

interface Props {
  sendMessage: (msg: string) => void;
}

const ChatBoxFooter = ({ sendMessage }: Props) => {
  const [msgInput, setMsgInput] = useState("");
  const [media, setMedia] = useState([]);
  const emojiClickAway = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleChange = (value: any) => {
    setMsgInput(value);
  };

  const addEmoji = (e: any) => {
    let emoji = e.native;
    setMsgInput(msgInput + emoji);
  };
  useOutsideClick({
    ref: emojiClickAway,
    handler: () => setShowEmoji(false),
  });

  const handleMessageInputKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key == "Enter") {
      e.preventDefault();
      if (msgInput.trim().length == 0 && media && media.length == 0) {
        return;
      }
      sendMessage(msgInput);
      setMsgInput("");
    }
  };

  const handleSendClick = () => {
    if (msgInput.trim().length == 0 && media && media.length == 0) {
      return;
    }
    sendMessage(msgInput);
    setMsgInput("");
  };

  return (
    <Flex w={"full"} py={"0.5rem"}>
      <Flex w="full">
        <Flex
          w="full"
          flex="1"
          bgColor={"#F5F7FB"}
          borderRadius={"1rem"}
          ml="1rem"
        >
          <Flex
            ref={emojiClickAway}
            pos="relative"
            height={"100%"}
            width={"3rem"}
            pl={"1rem"}
            pb="0.5rem"
            align="end"
            justify="center"
          >
            <Emoji
              showEmoji={showEmoji}
              addEmoji={addEmoji}
              style={{
                position: "absolute",
                bottom: "40px",
                left: "0",
              }}
            />

            <FiSmile
              color="black"
              size={28}
              onClick={() => {
                setShowEmoji(!showEmoji);
              }}
            />
          </Flex>
          <TextareaAutosize
            className="custom_scrollBar"
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            type="*"
            onKeyPress={(e) => {
              handleMessageInputKey(e);
            }}
            style={{
              backgroundColor: "#F5F7FB",
              fontSize: "1rem",
              padding: "0.625rem",
              outline: "none",
              color: "black",
              width: "100%",
              borderRadius: "10px",
            }}
            maxRows={4}
            placeholder={"Type a message .."}
            value={msgInput}
          />
        </Flex>
        <Flex height={"100%"} width={"4rem"} align="end" justify={"center"}>
          <Flex
            cursor={"pointer"}
            onClick={handleSendClick}
            align={"center"}
            justify="center"
            borderRadius={"50%"}
            h="2.5rem"
            w="2.5rem"
            bgColor="#3BA58A"
          >
            <Icon
              as={FiSend}
              color={"white"}
              fontSize="1.4rem"
              mb="-1"
              ml="-0.5"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatBoxFooter;
