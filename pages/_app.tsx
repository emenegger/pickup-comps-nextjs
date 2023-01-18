import { ChakraProvider, CircularProgress } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import NavBar from "../src/components/NavBar";
import { UserStatsProvider } from "../src/context/user-context";
import { useState, useEffect, Provider } from "react";
import { AdjustedStatsProvider } from "../src/context/adjusted-stats-context";
import { NbaCompProvider } from "../src/context/nba-comp-context";
// import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
// import { useRouter } from "next/router";

// loading functionality
// function Loading() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   useEffect(()=> {
//     const handleStart = (url: string) => {
//       console.log('handleStart fired!')
//       return (url !== router.asPath) && setLoading(true)
//     };
//     const handleComplete = (url: string) => {
//       console.log('handleComplete fired!')
//       return (url === router.asPath) && setTimeout(()=> {setLoading(false)}, 5000)
//     };
//     router.events.on('routeChangeStart', handleStart);
//     router.events.on('routeChangeComplete', handleComplete);
//     router.events.on('routeChangeError', handleComplete);

//     return ()=> {
//     router.events.off('routeChangeStart', handleStart);
//     router.events.off('routeChangeComplete', handleComplete);
//     router.events.off('routeChangeError', handleComplete);
//     }
//   })
//   return loading && (
//     <CircularProgress isIndeterminate color='green.300'/>
//   )
// }


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
