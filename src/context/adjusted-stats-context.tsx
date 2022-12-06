import React, { useContext, useState, createContext } from "react";
import { createNonNullExpression } from "typescript";

const AdjustedStatsContext = createContext([]);

export function AdjustedStatsProvider({children}) {
  const [adjustedStats, setAdjustedStats] = useState({
    game_to: 0,
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
  });

  return (
    <AdjustedStatsContext.Provider value={[adjustedStats, setAdjustedStats]}>
      {children}
    </AdjustedStatsContext.Provider>
  )
}

export const useAdjustedStatsContext = () => useContext(AdjustedStatsContext)