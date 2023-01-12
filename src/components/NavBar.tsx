import { Tabs, TabList, Tab, Icon, Avatar, WrapItem } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { FiMenu, FiBarChart } from "react-icons/fi";
import { BiBasketball } from "react-icons/bi";
import Link from "next/link";
// import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0/client";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";

const NavBar = () => {
  // const { user, error, isLoading } = useUser();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const session = useSession();

  console.log("user", user);

  return (
    <Tabs>
      <TabList justifyContent="space-between" alignItems="flex-end">
        <Link href="/">
          <Tab>
            <Icon as={BiBasketball} />
          </Tab>
        </Link>
        {session ? (
          <>
            <Link href="/comparison">
              <Tab>Your Comps</Tab>
            </Link>
            <Tab onClick={() => supabase.auth.signOut()}>Logout</Tab>
          </>
        ) : (
          <Link href="/">
            <Tab>Login</Tab>
          </Link>
        )}
      </TabList>
    </Tabs>
  );
};

export default NavBar;
