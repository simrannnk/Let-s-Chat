import React, { useEffect, useRef, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

const CreateRoomModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const toast = useToast();
  const [input, setInput] = useState<string>("");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Please enter new room name"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            focusBorderColor="none"
            size={"md"}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme={"teal"}
            onClick={(e) => {
              if (input.trim().length !== 0) {
                onSubmit(input);
              } else {
                toast({
                  title: "Please enter valid name",
                  status: "error",
                  variant: "left-accent",
                  isClosable: true,
                });
              }
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
