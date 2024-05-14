import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

export const MessageSkeleton = ({ isReverse }: { isReverse: boolean }) => {
  const endColor = "rgba(35, 34, 52, 1)";
  const startColor = "rgba(56, 55, 72, 1)";
  return (
    <Flex
      w="100%"
      flexGrow={1}
      flexDir={isReverse ? "row-reverse" : "row"}
      alignItems="flex-start"
      my={"10px"}
    >
      <SkeletonCircle size="12" startColor={startColor} endColor={endColor} />
      <Flex w="90%" flexDirection="column" ml="0.5rem">
        <Skeleton
          height="5px"
          width="40%"
          startColor={startColor}
          endColor={endColor}
          mt="0.5rem"
          borderRadius="10px"
        />
        <Skeleton
          height="18px"
          //   width="90%"
          display="flex"
          flexGrow={1}
          startColor={startColor}
          endColor={endColor}
          mt="0.5rem"
          borderRadius="5px"
        />
      </Flex>
    </Flex>
  );
};
