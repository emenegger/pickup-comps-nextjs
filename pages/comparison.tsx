import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Divider,
  Heading,
  Box,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import BarChartContainer from "../src/components/BarChart";
import PlayerCard from "../src/components/PlayerCard";
import { retrievedData } from "../src/store/retrieved-data";
// import { useRef, useState, useContext } from "react";


// export const getStaticProps = async () => {
//   let i = 23;
//   for (let i = 28; i < 20; i++){
//     const res = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${i}`);
//     const data = await res.json();
//     data && retrievedData.push(data);
//     console.log('data', data);
//     return {
//       props: {
//         playerSeasonAverage: data,
//       }
//     }
//   }
// }

const comparison = () => {


  const now = 90;
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Heading textAlign="center" size="xl">
        Your NBA Doppelgangers
      </Heading>
      <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(290px, 1fr))'>
      <PlayerCard />
      <PlayerCard />
      <PlayerCard />
      </SimpleGrid>
    </Flex>
  );
};

export default comparison;
