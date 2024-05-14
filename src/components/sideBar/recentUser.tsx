import { Avatar, Flex, Text } from "@chakra-ui/react";
import { ActiveUser } from "atom/chat";
import User from "atom/user";
import React, { FC, useEffect } from "react";
import { FiDroplet } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface Props {}

const RecentUser = (props: Props) => {
  const user = useRecoilValue(User);

  const setActiveUser = useSetRecoilState(ActiveUser);
  useEffect(() => {
    if (user && user.roomIds.length > 0) {
      setActiveUser({
        name: user.roomIds[0].name,
        userId: user.roomIds[0]._id,
      });
    }
  }, []);
  return (
    <Flex
      overflowY={"auto"}
      p={"0.2rem"}
      w={"full"}
      h={"calc(100% - 140px)"}
      py={"0.1rem"}
    >
      <Flex
        className="custom_scrollBar"
        w="full"
        h={"fit-content"}
        maxH={"100%"}
        flexDir={"column"}
        bgColor="white"
        borderRadius={"0.8rem"}
      >
        {user &&
          user.roomIds &&
          user.roomIds.map((data, index) => {
            return <UserCard key={data._id} data={data} />;
          })}
      </Flex>
    </Flex>
  );
};

export default RecentUser;

export const UserCard: FC<{
  data: {
    name: string;
    _id: string;
    lastMessage?: string;
    isNotification?: boolean;
  };
}> = ({ data }) => {
  const setActiveUser = useSetRecoilState(ActiveUser);
  const setUser = useSetRecoilState(User);

  const handleOnClick = () => {
    if (data.isNotification)
      setUser((prev) => {
        return {
          ...prev,
          roomIds: prev.roomIds.map((dat) => {
            return {
              ...dat,
              isNotification: false,
            };
          }),
        };
      });
    setActiveUser({
      name: data.name,
      userId: data._id,
    });
  };

  return (
    <Flex
      w="full"
      h={"5rem"}
      p={"1rem"}
      cursor="pointer"
      _hover={{
        bgColor: "#F5F7FB",
        opacity: 7,
      }}
      alignItems={"center"}
      onClick={handleOnClick}
    >
      <Avatar
        cursor={"pointer"}
        height={"42px"}
        width={"42px"}
        mr={"10px"}
        src={`https://avatars.dicebear.com/api/pixel-art/${data._id}.svg`}
        borderWidth={"2px"}
        borderColor={"white"}
        borderStyle="solid"
        name={"N"}
      />
      <Flex flexDir={"column"} flex="1">
        <Text
          as="h3"
          color={"black"}
          fontWeight="600"
          isTruncated
          width={"full"}
        >
          {data.name}
        </Text>
        {data.lastMessage ? (
          <Text as="p" fontSize={"0.8rem"} color={"lightblue"}>
            {data.lastMessage}
          </Text>
        ) : (
          <></>
        )}
      </Flex>
      {data?.isNotification && (
        <Flex h="full" align={"center"}>
          <Flex borderRadius={"50%"} bgColor={"pink"} h="1.5" w="1.5"></Flex>
        </Flex>
      )}
    </Flex>
  );
};
