import React, { useContext, useState, createContext } from "react";

const NbaCompContext = createContext([]);

export function NbaCompProvider({ children }) {
  const [nbaComp, setNbaComp] = useState({
    ast: 0,
    blk: 0,
    dreb: 0,
    fg3_pct: 0,
    fg3a: 0,
    fg3m: 0,
    fg_pct: 0,
    fga: 0, 
    fgm: 0,
    first_name: "",
    ft_pct: 0,
    fta: 0,
    ftm: 0,
    games_played: 0,
    height_feet: 0,
    height_inches: 0,
    last_name: "",
    min: "",
    oreb: 0,
    pf: 0,
    position: "",
    pts: 0,
    reb: 0,
    season: 2022,
    simalarityTotal: 0,
    stl: 0,
    team: {
      id: 0,
      abbreviation: "",
      city: "",
      conference: "",
      division: "",
      full_name: "",
      name: "",
    },
    turnover: 0,
    weight_pounds: 0,
    _id: 0,
    imgSrc: ''
  });

  return (
    <NbaCompContext.Provider value={[nbaComp, setNbaComp]} >
      {children}
    </NbaCompContext.Provider>
  )
}

export const useNbaCompContext = () => useContext(NbaCompContext);
