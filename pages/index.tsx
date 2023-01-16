// import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Text,
  Center,
  Container,
} from "@chakra-ui/react";
import FormMain from "../src/components/FormMain";
import { MongoClient } from "mongodb";
import { useEffect, useState } from "react";
import axios from "axios";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Dashboard from "../src/components/Dashboard";


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

  const session = useSession();
  const supabase = useSupabaseClient();


  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Container>
          <Center>
            <Text fontSize="3xl">Sign In</Text>
          </Center>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        </Container>
      ) : (
        <Dashboard session={session}/>
      )}
    </div>
    // <Home session={session}/>
  );
}

// export const getServerSideProps = withPageAuthRequired();
