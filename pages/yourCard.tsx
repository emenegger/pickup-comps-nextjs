import React from 'react';
import {
  Heading,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import PlayerCard from "../src/components/PlayerCard";

const yourCard = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Heading textAlign="center" size="xl">
        Your NBA Doppelganger
      </Heading>
      <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(290px, 1fr))'>
      <PlayerCard />
      </SimpleGrid>
    </Flex>
  )
}

export default yourCard