import React, { FC } from "react";

import { Flex } from "@chakra-ui/react";

const HomeLayout = ({ children }) => {
  return (
    <Flex align="center" justify="center" h="100%" w="100%">
      <Flex
        mt={"-25px"}
        h="90vh"
        w="90vw"
        bgColor={"#F5F7FB"}
        borderRadius="1rem"
        overflow={"hidden"}
        p="1rem"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default HomeLayout;
