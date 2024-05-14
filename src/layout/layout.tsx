import React, { useEffect, useState } from "react";
import Socket from "atom/socket";
import User, { UserToken } from "atom/user";
import config from "config";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserType } from "types/user";
import { theme } from "../../styles/theme";
import axios from "../services/axiosInstance";

import * as io from "socket.io-client";
import { chakra, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { GetUser } from "services/user";
// import IncomingCard from "components/videoCall/VideoCallComponents/incomingCard";

export default function Layout({ children }: any) {
  const [user, setUser] = useRecoilState(User);
  const userToken = useRecoilValue(UserToken);

  const [socket, setSocket] = useRecoilState(Socket);
  const router = useRouter();
  const [shouldShow, setShouldShow] = useState(false);

  const OnUserData = (user: UserType) => {
    setUser(user);

    if (user) {
      const socketInstance = io.connect(config.server, {
        transports: ["websocket"],
      });
      setSocket(socketInstance);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setShouldShow(false);
        socket.emit("join", userToken?.userId);
      });
      socket.on("disconnect", () => {
        setShouldShow(true);
      });
    }
  }, [socket]);

  const UserQuery = async () => {
    try {
      const data = await GetUser({
        userId: userToken?.userId || "",
        token: userToken?.token || "",
      });

      if (data) {
        OnUserData(data);
      }
    } catch (err) {
      console.log(err);
    }
  }; // Axios Call for User

  useEffect(() => {
    UserQuery();
  }, [userToken]);

  useEffect(() => {
    const hasTokens = Boolean(
      (typeof window !== "undefined" && localStorage.getItem("tokens")) ||
        userToken?.token
    );

    if (
      (router.pathname === "/signup" || router.pathname === "/login") &&
      hasTokens
    ) {
      router.replace("/");
      return;
    }

    if (!hasTokens) {
      setUser(null);
    }
  }, [userToken]);

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Let's Chat</title>
      </Head>
      <chakra.main
        w="100vw"
        h="100vh"
        className="withScroll"
        display="flex"
        flexDirection="column"
        bgColor={"#D8DBE3"}
      >
        {/* <IncomingCard /> */}
        {children}
      </chakra.main>
    </ChakraProvider>
  );
}
