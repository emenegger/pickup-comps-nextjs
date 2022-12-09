import React, { useContext, useState, createContext } from "react";
import { userStatsType } from "../global/types";

const UserStatsContext = createContext([]);

export function UserStatsProvider({ children }) {
  const [userStatsObj, setUserStatsObj] = useState({
    game_to: 0,
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
    date: null,
  });
  return (
    <UserStatsContext.Provider value={[userStatsObj, setUserStatsObj]}>
      {children}
    </UserStatsContext.Provider>
  );
}

export function useUserStatsContext() {
  return useContext(UserStatsContext);
}
