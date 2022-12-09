import { userStatsType } from "../global/types";

export const playerMatchFunc = (adjustedUserStats: userStatsType, apiData) => {
  // console.log("apiData", apiData);
  console.log("userAdjusted stats", adjustedUserStats);

  const bestMatch = {
    simalarityTotal: Infinity,
    _id: null,
    pts: null,
    ast: null,
    reb: null,
    stl: null,
    blk: null,
    first_name: null,
    last_name: null,
  };

  for (const playerObj of apiData) {
    // console.log(playerObj.data)
    if (playerObj) {
      const diff = (a:number, b: number) => Math.abs(a - b);
      // refactor this!!!
      const simalarityTotal =
        diff(adjustedUserStats.points, playerObj.pts) +
        diff(adjustedUserStats.assists, playerObj.ast) +
        diff(adjustedUserStats.rebounds, playerObj.reb);
      // console.log(playerObj.player_id, simalarityTotal);
      if (simalarityTotal < bestMatch.simalarityTotal) {
        bestMatch.simalarityTotal = simalarityTotal;
        Object.assign(bestMatch, playerObj);
      }
    }
  }

  console.log("bestMatch", bestMatch);
  // should I save this to the state?
  return bestMatch;
};

// export default playerMatchFunc;