import {
  InputGroup,
  useColorModeValue,
  InputRightAddon,
  Input,
  Button,
  CircularProgress
} from "@chakra-ui/react";
import React, { useRef, useState, useContext, useEffect, Suspense } from "react";
import { useUserStatsContext } from "../context/user-context";
import Link from "next/link";
import { useAdjustedStatsContext } from "../context/adjusted-stats-context";
import { userStatsType } from "../global/types";
// import axios from "axios";
// import { MongoClient } from "mongodb";
import { playerMatchFunc } from "../functions/playerMatch";
import { useNbaCompContext } from "../context/nba-comp-context";
import { adjustUserStats } from "../functions/adjustUserStats";
import { useRouter } from "next/router";

const MONGODB_URI =
  "mongodb+srv://evanemenegger:UXae5uEMtelJoptR@cluster0.d1andp0.mongodb.net/nba_stats?retryWrites=true&w=majority";

// const client = new MongoClient(MONGODB_URI);

const FormMain = (props: any) => {
  const [userStatsObj, setUserStatsObj] = useUserStatsContext();
  const [adjustedStats, setAdjustedStats] = useAdjustedStatsContext();
  const [nbaComp, setNbaComp] = useNbaCompContext();

  const inputBackground = useColorModeValue("white.300", "gray.800");
  const { formItems } = props;
  
  const router = useRouter();

  const leagueAverageTeamPoints = 110.6;
  // let loading = false;

  // adding player averages data from the ball don't lie api to the database
  // const addPlayerData = async () => {
  //   // iterates through the data
  //   let queryString =
  //     "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";
  //   for (let i = 1; i < 10; i++) {
  //     // fetches and saves the data
  //     queryString += `${i},`;
  //   }
  //   const result = await axios.get(queryString);
  //   console.log(result)
  //   axios
  //     .post("/api/nba-stats", result)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // add images to each player
  // const addImgs = async () => {
  //   const allPlayerData = nbaNetData.league.standard;
  //   // allPlayerData.forEach(player => {
  //   //    axios.patch("/api/add-imgs")
  //   // })
  //   for (let i = 0; i < allPlayerData.length; i++) {
  //     console.log(allPlayerData[i]);
  //     axios.patch("/api/add-imgs", {
  //       allPlayerData: allPlayerData[i],
  //     })
  //   }
  // };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // loading = true;
    // sets the new adjusted stats based on the user input
    setAdjustedStats(
      adjustUserStats(userStatsObj, leagueAverageTeamPoints, adjustedStats)
    );
    console.log("userStatsObj", userStatsObj);
    const jsonData = await fetch("/api/nba-players");
    const data = await jsonData.json();

    // playerMatch = playerMatchFunc(adjustedStats, data);
    setNbaComp(playerMatchFunc(adjustedStats, data));

    console.log("nbaComp", nbaComp);
    // loading = false;
    router.push("/comparison");
  };

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    setUserStatsObj({
      ...userStatsObj,
      [e.target.id]: e.target.value,
      date: new Date().toLocaleDateString(),
    });
  };

  const inputs = formItems.map((ele: string, i: number) => {
    return (
      <InputGroup key={ele + i}>
        <Input
          variant="outline"
          placeholder={ele[0]}
          id={ele[0]}
          background={inputBackground}
          onChange={handleUserInput}
        />
        <InputRightAddon children={ele[1]} width="22%" />
      </InputGroup>
    );
  });

  return (
    <Suspense fallback={<CircularProgress isIndeterminate color='green.300' />}>
    <form onSubmit={submitHandler}>
      {inputs}
      <Button type="submit" colorScheme="teal" onSubmit={submitHandler}>
        Submit Stats
      </Button>
    </form>
    </Suspense>
  );
};

export default FormMain;
