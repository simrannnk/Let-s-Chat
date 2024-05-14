import React, { Dispatch, SetStateAction } from "react";
import { Flex, Input } from "@chakra-ui/react";

interface Props {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ input, setInput }: Props) => {
  return (
    <Flex w={"full"} my={"0.8rem"}>
      <Input
        bgColor={"white"}
        borderRadius={"1rem"}
        placeholder="Search"
        w={"full"}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        focusBorderColor="none"
        size="md"
      />
    </Flex>
  );
};

export default SearchBar;
