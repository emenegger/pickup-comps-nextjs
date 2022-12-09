import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../src/components/NavBar";
import { UserStatsProvider } from "../src/context/user-context";
import { useState, Provider } from "react";
import { AdjustedStatsProvider } from "../src/context/adjusted-stats-context";
import { NbaCompProvider } from "../src/context/nba-comp-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserStatsProvider>
        <AdjustedStatsProvider>
          <NbaCompProvider>
            <NavBar />
            <Component {...pageProps} />
          </NbaCompProvider>
        </AdjustedStatsProvider>
      </UserStatsProvider>
    </ChakraProvider>
  );
}
