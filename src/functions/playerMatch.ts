import { userStatsType } from "../global/types";

export const playerMatchFunc = (adjustedUserStats: userStatsType, apiData) => {
  // console.log("apiData", apiData);
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

// export default playerMatchFunc;