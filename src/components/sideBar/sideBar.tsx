import React, { useState } from "react";

import { Button, Flex, useToast } from "@chakra-ui/react";
import SidebarHeader from "./sidebarHeader";
import SearchBar from "./searchBar";
import RecentUser from "./recentUser";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Room } from "atom/chat";
import CreateRoomModal from "components/modals/createRoomModal";
import {
  AddRoomMutation,
  CreateRoomMutation,
  GetRecentUserQuery,
} from "services/room";
import User, { UserToken } from "atom/user";
import AddRoomModal from "components/modals/addRoomModal";
interface Props {}

const SideBar = (props: Props) => {
  const [user, setUser] = useRecoilState(User);
  const userToken = useRecoilValue(UserToken);
  const toast = useToast();
  const [searchInput, setSearchInput] = useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  const handleCreateRoomClose = () => {
    setIsCreateOpen(false);
  };

  const handleAddRoomClose = () => {
    setIsAddRoomOpen(false);
  };

  const CreateRoom = async (name: string) => {
    try {
      const data = await CreateRoomMutation({
        name,
        userId: userToken?.userId || "",
        token: userToken?.token || "",
      });
      console.log(data);
      setUser((prev) => {
        return {
          ...prev,
          roomIds: [{ _id: data._id, name, users: [] }, ...prev.roomIds],
        };
      });
      toast({
        title: "Room Created Succussfully",
        status: "success",
        variant: "left-accent",
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "User already exist with same email",
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
    } finally {
      handleCreateRoomClose();
    }
  };

  const AddRoom = async (name: string) => {
    console.log("Me chla ");
    try {
      const data = await AddRoomMutation({
        name,
        userId: userToken?.userId || "",
        token: userToken?.token || "",
      });
      console.log(data);
      toast({
        title: "Room Created Succussfully",
        status: "success",
        variant: "left-accent",
        isClosable: true,
      });
      setUser((prev) => {
        return {
          ...prev,
          roomIds: [{ _id: data._id, name, users: [] }, ...prev.roomIds],
        };
      });
    } catch (err: any) {
      console.log(err);
      toast({
        title: "User already exist with same email",
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
    } finally {
      handleAddRoomClose();
    }
  };

  const handleCreateRoomSubmit = (name: string) => {
    CreateRoom(name);
  };

  const handleAddRoomSubmit = (name: string) => {
    console.log("Me chla ");
    AddRoom(name);
  };

  return (
    <>
      <CreateRoomModal
        isOpen={isCreateOpen}
        onClose={handleCreateRoomClose}
        onSubmit={handleCreateRoomSubmit}
      />
      <AddRoomModal
        isOpen={isAddRoomOpen}
        onClose={handleAddRoomClose}
        onSubmit={handleAddRoomSubmit}
      />
      <Flex h="full" flex={1} minW={"20rem"} maxW="22.5rem" flexDir="column">
        <SidebarHeader />
        <Flex w={"full"} mt={"1rem"} justify="space-around">
          <Button
            bgColor={"lightblue"}
            variant={"solid"}
            fontSize={"1rem"}
            onClick={() => {
              setIsCreateOpen(true);
            }}
          >
            + Create Room
          </Button>
          <Button
            bgColor={"lightblue"}
            onClick={() => {
              setIsAddRoomOpen(true);
            }}
            variant={"solid"}
            fontSize={"1rem"}
          >
            Join Room
          </Button>
        </Flex>
        <SearchBar input={searchInput} setInput={setSearchInput} />
        <RecentUser />
      </Flex>
    </>
  );
};

export default SideBar;
