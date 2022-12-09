export const adjustUserStats = (
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