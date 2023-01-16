import React from 'react'
import {
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import FormMain from './FormMain';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'
// const formBackground = useColorModeValue("gray.100", "gray.700");

const formItems = [
  ["game_to", "pts"],
  ["points", "pts"],
  ["assists", "ast"],
  ["rebounds", "reb"],
  ["steals", "stl"],
  ["blocks", "blk"],
];


const Dashboard = ({session}) => {

  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)

  console.log('session:', session)
  return (
    <Flex
      height="100vh"
      alignItems="center"
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
      <Flex direction="column" background={"gray.100"} p={12} rounded={6}>
        <Text fontSize="sm">
          Did you play more like Giannis or Westbrook today? <br />
          Enter your stats to find out.
        </Text>
        <FormMain formItems={formItems} />
        {/* <Button onClick={toggleColorMode}>Dark Mode</Button> */}
      </Flex>
    </Flex>
  )
}

export default Dashboard