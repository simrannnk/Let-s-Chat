import React, { useEffect, useRef, useState } from "react";

import { Box, chakra, Divider, Flex } from "@chakra-ui/react";
import ChatBoxHeader from "./chatBoxHeader";
import ChatBoxFooter from "./chatBoxFooter";
import { ChatMessageType } from "types/chat";
import Message from "./message";
import InfiniteScroll from "react-infinite-scroller";
import moment from "moment";
import { MessageSkeleton } from "components/skeletons";
import { useRecoilState, useRecoilValue } from "recoil";
import { ActiveUser } from "atom/chat";
import { GetChat } from "services/chat";
import User, { UserToken } from "atom/user";
import Socket from "atom/socket";
import { v4 as uuidv4 } from "uuid";

interface Props {}

const ChatBox = (props: Props) => {
  const [activeUser, setActiveUser] = useRecoilState(ActiveUser);
  const [user, setUser] = useRecoilState(User);
  const userToken = useRecoilValue(UserToken);
  const socket = useRecoilValue(Socket);
  const chatMessageRef = useRef<HTMLInputElement>(null);
  const [chat, setChat] = useState<ChatMessageType[]>([]);
  const clearStateFuc = () => {
    console.log("Clear States");
    setChat([]);
  };

  const chatMessageLoadMore = () => {};

  const GetChatMessageQuery = async () => {
    try {
      const data = await GetChat({
        roomId: activeUser?.userId || "",
        token: userToken?.token || "",
      });
      console.log(data);
      setChat(data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = (msg: string) => {
    if (msg.trim().length > 0) {
      const payload = {
        id: uuidv4() as string,
        roomId: activeUser?.userId,
        msg,
        from: userToken?.userId,
        name: user.name,
        createdAt: moment().toString(),
      };
      socket && socket.emit("send-message", payload);
      console.log(payload);
      setChat((prev): any => {
        return [...prev, { ...payload, isSent: false }];
      });
      chatMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("get-message", (payload) => {
        console.log(payload);
        let isSameRoom = true;
        setActiveUser((prev) => {
          if (prev?.userId !== payload.roomId) {
            isSameRoom = false;
          }
          return prev;
        });

        if (isSameRoom) {
          setChat((prev) => {
            let val = prev.filter((data) => data.id === payload.id);
            if (val.length > 0) {
              return prev.map((data) => {
                return {
                  ...data,
                  isSent: true,
                };
              });
            } else return [...prev, payload];
          });
        } else {
          setUser((prev) => {
            return {
              ...prev,
              roomIds: prev.roomIds.map((dat) => {
                if (dat._id === payload.roomId)
                  return {
                    ...dat,
                    isNotification: true,
                  };
                else {
                  return dat;
                }
              }),
            };
          });
        }
      });
    }
    () => {
      if (socket) {
        socket.removeListener("get-message");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (activeUser && activeUser.userId) {
      GetChatMessageQuery();
    }
    () => {
      clearStateFuc();
    };
  }, [activeUser?.userId]);

  return (
    <>
      <Flex flex={1} pl={"1rem"}>
        <Flex
          h="full"
          w="full"
          bgColor={"white"}
          borderRadius="0.8rem"
          flexDir={"column"}
        >
          <ChatBoxHeader />
          <Divider bgColor={"lightblue"} h={"1px"} w={"full"} />

          <Flex
            flex={1}
            className="custom_scrollBar"
            overflowY="auto"
            flexDir="column"
            border="none"
          >
            <InfiniteScroll
              key="infiniteScroll"
              loadMore={chatMessageLoadMore}
              // hasMore={chat.pagination.total > chatOffset && chatOffset != 0}
              loader={
                <>
                  <MessageSkeleton isReverse={false} />
                  <MessageSkeleton isReverse={true} />
                </>
              }
              className="custom_scrollBar"
              style={{
                width: "100%",
              }}
              threshold={250}
              useWindow={false}
              isReverse={true}
              initialLoad={false}
              start={10}
            >
              {chat.map((msg, index) => {
                if (
                  (index > 0 &&
                    !moment(msg.createdAt).isSame(
                      moment(chat[index - 1].createdAt),
                      "day"
                    )) ||
                  index === 0
                ) {
                  return (
                    <chakra.span key={msg.from + index}>
                      <Flex justifyContent={"center"}>
                        <Box
                          mt="0.625rem"
                          fontSize={"12px"}
                          color={"active.primary"}
                          display={"inline-block"}
                          padding={"2px 10px"}
                          fontWeight={500}
                          borderRadius={"10px"}
                          bgColor={"lightblue"}
                        >
                          {moment(msg.createdAt).format("MMM Do YY")}
                        </Box>
                      </Flex>
                      <Message Message={msg} />
                    </chakra.span>
                  );
                }
                return <Message key={index} Message={msg} />;
              })}

              <div ref={chatMessageRef} style={{ height: 0, width: 0 }} />
            </InfiniteScroll>
          </Flex>
          <Divider bgColor={"lightblue"} h={"1px"} w={"full"} />
          <ChatBoxFooter sendMessage={sendMessage} />
        </Flex>
      </Flex>
    </>
  );
};

export default ChatBox;
