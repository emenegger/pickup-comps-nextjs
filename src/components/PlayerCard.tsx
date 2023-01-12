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
  CircularProgress,
} from "@chakra-ui/react";
import Head from "next/head";
// import ProgressBar from "react-bootstrap/ProgressBar";
import { BiLike, BiChat, BiShare, BiDotsVerticalRounded } from "react-icons/bi";
import BarChartContainer from "./BarChart";
import TableStats from "./TableStats";
import TableDetails from "./TableDetails";
import { useUserStatsContext } from "../context/user-context";
import { useAdjustedStatsContext } from "../context/adjusted-stats-context";
import { useNbaCompContext } from "../context/nba-comp-context";
import { Suspense } from "react";

const PlayerCard = () => {
  let now = 80;

  const [userStatsObj, setUserStatsObj] = useUserStatsContext();
  const [adjustedStats, setAdjustedStats] = useAdjustedStatsContext();
  const [nbaComp, setNbaComp] = useNbaCompContext();

  return (
    <Suspense fallback={<CircularProgress isIndeterminate color="green.300" />}>
      <Card>
        <CardHeader>
          <Flex>
            <Text size="xs" as="i">
              Pick Up Game on {userStatsObj.date}
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Image src={nbaComp.imgSrc} alt="player name" borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign="center">
              {nbaComp.first_name} {nbaComp.last_name}
            </Heading>
          </Stack>
          <TableDetails playerDetails={nbaComp} />
          <Divider />
          <Stack spacing={5} m={4}>
            <Heading size="sm" textAlign="center">
              Match Percentage
            </Heading>
            <Progress
              colorScheme="green"
              height="32px"
              value={100 - nbaComp.simalarityTotal * 2}
              display="true"
            />
            {/* <Text>{100 - nbaComp.simalarityTotal * 2}%</Text> */}
          </Stack>
        </CardBody>
        <Divider />
        <TableStats playerDetails={nbaComp} />
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
    </Suspense>
  );
};

export default PlayerCard;
