import mongoose from "mongoose";

const NbaSchema = new mongoose.Schema({
  _id: { $oid: "637fa13f4ad72cd10aa2ac68" },
  data: {
    games_played: { type: Number },
    player_id: { type: Number },
    season: { type: Number  },
    min: Number,
    fgm: { type: Number  },
    fga: { type: Number  },
    fg3m: { type: Number  },
    fg3a: { type: Number },
    ftm: { type: Number  },
    fta: { type: Number  },
    oreb: { type: Number },
    dreb: { type: Number  },
    reb: { type: Number },
    ast: { type: Number  },
    stl: { type: Number  },
    blk: { type: Number  },
    turnover: { type: Number  },
    pf: { type: Number  },
    pts: { type: Number  },
    fg_pct: { type: Number },
    fg3_pct: { type: Number  },
    ft_pct: { type: Number  },
  },
});

export default mongoose.model("NbaPlayers", NbaSchema)