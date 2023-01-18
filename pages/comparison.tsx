import React from "react";
import { Suspense, useState, useEffect } from "react";
import { Heading, Flex, SimpleGrid, CircularProgress } from "@chakra-ui/react";
import BarChartContainer from "../src/components/BarChart";
import PlayerCard from "../src/components/PlayerCard";
import { useRouter } from "next/router";

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

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url: string) => {
      console.log("handleStart fired!");
      return url !== router.asPath && setLoading(true);
    };
    const handleComplete = (url: string) => {
      console.log("handleComplete fired!");
      return (
        url === router.asPath &&
        setTimeout(() => {
          setLoading(false);
        }, 5000)
      );
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return loading && <CircularProgress isIndeterminate color="green.300" />;
}

// ** figure out how to get a spinner!!

const comparison = () => {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Heading textAlign="center" size="xl">
        Your NBA Doppelgangers
      </Heading>
      <SimpleGrid
        spacing={2}
        templateColumns="repeat(auto-fill, minmax(290px, 1fr))"
      >
        <PlayerCard />
      </SimpleGrid>
    </Flex>
  );
};

export default comparison;
