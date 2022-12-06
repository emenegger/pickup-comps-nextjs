import {
  InputGroup,
  useColorModeValue,
  InputRightAddon,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useRef, useState, useContext, useEffect } from "react";
import { useUserStatsContext } from "../context/user-context";
import Link from "next/link";
import { useAdjustedStatsContext } from "../context/adjusted-stats-context";
import { userStatsType } from "../global/types";
import axios from "axios";
import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://evanemenegger:UXae5uEMtelJoptR@cluster0.d1andp0.mongodb.net/nba_stats?retryWrites=true&w=majority";

const adjustUserStats = (
  inputStats: userStatsType,
  currLeagueAverPoints: number,
  adjustedUserStatsObj: userStatsType
) => {
  const factor = (currLeagueAverPoints / inputStats.game_to) * (30 / 48);
  for (const key in inputStats) {
    adjustedUserStatsObj[key] = Math.floor(inputStats[key] * factor);
  }
  console.log("adjustedUserStatsObj", adjustedUserStatsObj);
  return adjustedUserStatsObj;
};

const FormMain = (props: any) => {
  const [userStatsObj, setUserStatsObj] = useUserStatsContext();
  const [adjustedStats, setAdjustedStats] = useAdjustedStatsContext();
  const [nbaStats, setNbaStats] = useState([]);
  let stats = undefined;

  const inputBackground = useColorModeValue("white.300", "gray.800");
  const { formItems } = props;

  const leagueAverageTeamPoints = 110.6;

  const addPlayerData = async () => {
    console.log("addPlayerData fired");
    for (let i = 454; i < 458; i++) {
      const result = await axios.get(
        `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${i}`
      );
      console.log("addPlayer result", result.data.data[0]);
      if (result.data.data[0]) {
        await axios
          .post("/api/nba-stats", result.data.data[0])
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log("data is empty", result.data.data[0]);
      }
    }
  };

  // addPlayerData();

  const playerMatchFunc = (adjustedUserStats: userStatsType, apiData) => {
    console.log("apiData", apiData);
    console.log("userAdjusted stats", adjustedUserStats);

    const bestMatch = {
      simalarityTotal: Infinity,
      player_id: null,
      pts: null,
      ast: null,
      reb: null,
      stl: null,
      blk: null,
    };

    for (const playerObj of apiData) {
      // console.log(playerObj.data)
      if (playerObj) {
        const diff = (a:number, b: number) => Math.abs(a - b);
        // refactor this!!!
        const simalarityTotal =
          diff(adjustedUserStats.points, playerObj.data.pts) +
          diff(adjustedUserStats.assists, playerObj.data.ast) +
          diff(adjustedUserStats.rebounds, playerObj.data.reb);
        // console.log(playerObj.player_id, simalarityTotal);
        if (simalarityTotal < bestMatch.simalarityTotal) {
          bestMatch.simalarityTotal = simalarityTotal;
          bestMatch.player_id = playerObj.data.player_id;
          bestMatch.pts = playerObj.data.pts;
          bestMatch.ast = playerObj.data.ast;
          bestMatch.reb = playerObj.data.reb;
          bestMatch.stl = playerObj.data.stl;
          bestMatch.blk = playerObj.data.blk;
        }
      }
    }

    console.log("bestMatch", bestMatch);
    // should I save this to the state?
    return bestMatch;
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // addPlayerData();
    setAdjustedStats(
      adjustUserStats(userStatsObj, leagueAverageTeamPoints, adjustedStats)
    );
    console.log("userStatsObj", userStatsObj);
    const jsonData = await fetch("/api/nba-stats")
    const data = await jsonData.json();
    console.log(data);
    
    playerMatchFunc(adjustedStats, data);
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

  // compare userStatsObj to each player in database

  // const LinkButton = React.forwardRef(({ submitHandler, href }, ref) => {
  //   return (
  //     <Button colorScheme="teal">
  //       <a href={href} onSubmit={submitHandler} ref={ref}>
  //         Click Here
  //       </a>
  //     </Button>
  //   );
  // });

  return (
    <form onSubmit={submitHandler}>
      {inputs}
      <Button type="submit" colorScheme="teal" onSubmit={submitHandler}>
        {/* <Link href="/comparison" onSubmit={submitHandler}> */}
        Submit Stats
        {/* </Link> */}
      </Button>
      {/* <Link href="/comparison" passHref legacyBehavior>
        <LinkButton />
      </Link> */}
    </form>
  );
};

export default FormMain;
