import React from "react";
import { Suspense, useState, useEffect } from "react";
import {
  Heading,
  Flex,
  SimpleGrid,
  CircularProgress,
  useDisclosure,
  ScaleFade,
} from "@chakra-ui/react";

import PlayerCard from "../src/components/PlayerCard";
import { useRouter } from "next/router";
import Loading from "../src/components/loading";
import { useLoadingContext } from "../src/context/loading-context";

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
  const [loading, setLoading] = useLoadingContext();
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      setLoading({
        stillLoading: false,
        value: 0,
        endValue: 2000,
      });
    }, 1500);
    setLoading({
      stillLoading: true,
      value: 0,
      endValue: 2000,
    });
    onToggle();
  }, []);

  const NotLoading = () => {
    return (
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <ScaleFade initialScale={0.9} in={isOpen}>
          <Heading textAlign="center" size="xl">
            Your NBA Doppelgangers
          </Heading>
          <PlayerCard />
        </ScaleFade>
      </Flex>
    );
  };

  return loading.stillLoading ? <Loading /> : <NotLoading />;
};

export default comparison;
