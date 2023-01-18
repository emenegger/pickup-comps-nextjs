import React from "react";
import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  Container,
} from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center>
      <CircularProgress
        isIndeterminate
        color="green.300"
        size="xs"
        thickness="5px"
        valueText="VALUE TEXT"
      >
        <CircularProgressLabel fontSize='lg' >calculating...</CircularProgressLabel>
      </CircularProgress>
    </Center>
  );
};

export default Loading;
