import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../src/components/NavBar";
import { UserStatsProvider } from "../src/context/user-context";
import { useState, Provider } from "react";
import { AdjustedStatsProvider } from "../src/context/adjusted-stats-context";
import { NbaCompProvider } from "../src/context/nba-comp-context";
// import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export default function App({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      {/* <UserProvider> */}
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
      {/* </UserProvider> */}
    </SessionContextProvider>
  );
}
