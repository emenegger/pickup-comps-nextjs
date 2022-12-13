// import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Text,
  AspectRatio,
  CircularProgress,
} from "@chakra-ui/react";
import FormMain from "../src/components/FormMain";
import { MongoClient } from "mongodb";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0/client';
import { getAccessToken } from '@auth0/nextjs-auth0';


const MONGODB_URI =
  "mongodb+srv://evanemenegger:KmQ9zBIaMfNKq8O0@cluster0.d1andp0.mongodb.net/nba_stats?retryWrites=true&w=majority";

// export const getStaticProps = async () => {
//   const client = await MongoClient.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "nba_stats",
//   });
//   const db = client.db();
//   const nbaStatsCollections = db.collection("nba_player_stats");

//   const nbaPlayers = await nbaStatsCollections.find().toArray();
//   console.log("nbaPlayers", nbaPlayers);

//   // client.close();

//   return {
//     props: {
//       nbaPlayers: nbaPlayers,
//     },
//   };
// };

export default function Home() {

  const { user, error, isLoading } = useUser();
  console.log( user, isLoading)

  const formItems = [
    ["game_to", "pts"],
    ["points", "pts"],
    ["assists", "ast"],
    ["rebounds", "reb"],
    ["steals", "stl"],
    ["blocks", "blk"],
  ];
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [nbaPlayerData, setNbaPlayerData] = useState([])

  
  return (
    <Flex
      height="100vh"
      alignItems="center"
      // backgroundImage="https://images.unsplash.com/photo-1629297234695-46b36f638b17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
      direction="column"
      textAlign="center"
    >
      <Flex direction="column" p={12} rounded={6}>
        <Heading size="2xl" noOfLines={1} justifyContent="center">
          Pickup Comps
        </Heading>
        <Text fontSize="xl">
          Compare your pickup stats to current NBA players
        </Text>
      </Flex>
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Text fontSize="sm">
          Did you play more like Giannis or Westbrook today? <br />
          Enter your stats to find out.
        </Text>
        <FormMain formItems={formItems} />
        {/* <Button onClick={toggleColorMode}>Dark Mode</Button> */}
      </Flex>
    </Flex>
  );
}

// export const getServerSideProps = withPageAuthRequired();