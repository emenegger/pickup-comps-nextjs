import React from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Progress,
  CardHeader,
  Flex,
  IconButton,
  Box,
  Avatar,
} from "@chakra-ui/react";
import Head from "next/head";
// import ProgressBar from "react-bootstrap/ProgressBar";
import { BiLike, BiChat, BiShare, BiDotsVerticalRounded } from "react-icons/bi";
import BarChartContainer from "./BarChart";
import TableStats from "./TableStats";
import TableDetails from "./TableDetails";
import { useUserStatsContext } from '../context/user-context'
import { useAdjustedStatsContext } from "../context/adjusted-stats-context";


const playerDetails = {
  first_name: "Anthony",
  last_name: "Edwards",
  full_name: "Anthony Edwards",
  position: "G",
  height_feet: 6,
  height_inches: 6,
  team: "Timberwolves",
  age: 21,
};


const PlayerCard = () => {

  let now = 80;

  const [userStatsObj, setUserStatsObj] = useUserStatsContext();
  const [adjustedStats, setAdjustedStats] = useAdjustedStatsContext();

  return (
    <Card>
      <CardHeader>
        <Flex>  
          <Text size="xs" as="i">
            Pick Up Game on {userStatsObj.date}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Image
          src="https://cdn.nba.com/headshots/nba/latest/1040x760/1630162.png"
          // src='public/jamesharden.png'
          alt="player name"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign="center">
            {playerDetails.full_name}
          </Heading>
        </Stack>
        <TableDetails playerDetails={playerDetails} />
        <Divider />
        <Stack spacing={5} m={4}>
          <Heading size="sm" textAlign="center">
            Match Percentage
          </Heading>
          <Progress
            colorScheme="green"
            height="32px"
            value={now}
            display="true"
          />
        </Stack>
      </CardBody>
      <Divider />
      <TableStats />
      {/* <BarChartContainer /> */}
      <CardFooter>
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlayerCard;
