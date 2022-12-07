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
import { playerMatchFunc } from "../functions/playerMatch";

const MONGODB_URI =
  "mongodb+srv://evanemenegger:UXae5uEMtelJoptR@cluster0.d1andp0.mongodb.net/nba_stats?retryWrites=true&w=majority";

// const client = new MongoClient(MONGODB_URI);

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

  // adding player averages data from the ball don't lie api to the database
  const addPlayerData = async () => {
    // iterates through the data
    let queryString =
      "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";
    for (let i = 1; i < 10; i++) {
      // fetches and saves the data
      queryString += `${i},`;
    }
    const result = await axios.get(queryString);
    console.log(result)
    axios
      .post("/api/nba-stats", result)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // addPlayerData();
  // let playerInfo = [];
  const playerInfo = {};

  // adding player names and bios to database
  const addNames = async () => {
    // fetch the data from the ball don't lie api
    // iterate through each page of all of the players
    for (let i = 26; i < 39; i++) {
      const result = await axios.get(
        `https://www.balldontlie.io/api/v1/players/?per_page=100&page=${i}`
      );
      let data = result.data.data;
      // iterate through each player in the page
      // for (let i = 1; i < 25; i++) {
      //   let playerId = data[i].id;
      //   await axios
      //     .patch("/api/nba-players", {
      //       player_id: playerId,
      //       player_bio: data[i],
      //     })
      //     .then((response) => console.log("response in addNames", response))
      //     .catch((err) => console.log(err));
      // }
      data.forEach(player => {
        playerInfo[player.id] = player;
      });
    }
    let queryString = 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]='
    const playerArr = Object.values(playerInfo);
    for (let i = playerArr.length - 1; i > playerArr.length - 1200; i--) {
      queryString += `${playerArr[i].id},`;
    }
    // playerInfo.forEach(player => {
    //   queryString += `${player.id},`;
    // })
    queryString = queryString.slice(0, queryString.length - 1)

    console.log('playerInfo', playerInfo);

    console.log('query string', queryString);

    console.log('query result', axios.get(queryString));

    // for each player in the result from the season averages query:
    // merge in bio data and then send that info to the db
    const result = await axios.get(queryString);
    result.data.data.forEach(player => {
      Object.assign(player, playerInfo[player.player_id]);
      // Object.assign(player, {_id: player.id})
      player._id = player.id
      delete player.id
      delete player.player_id
    })
    console.log('playerInfo', playerInfo)
    console.log('result', result.data.data)
    // add this entire result to the mongoDb db
    await axios
      .post("/api/nba-players", {
        playerData: result.data.data,
      })
      .then((response) => console.log("response in addNames", response))
      .catch((err) => console.log(err));
  
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // addPlayerData();
    // sets the new adjusted stats based on the user input
    setAdjustedStats(
      adjustUserStats(userStatsObj, leagueAverageTeamPoints, adjustedStats)
    );
    console.log("userStatsObj", userStatsObj);
    const jsonData = await fetch("/api/nba-stats");
    const data = await jsonData.json();

    playerMatchFunc(adjustedStats, data);

    addNames();
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

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   // fetch all data from the database
//   // to be able to compare it to the user's inputted stats
//   // pass the matched player data to the comparison page

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   }
// }

export default FormMain;
