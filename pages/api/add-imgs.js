// import NbaPlayers from '../../models/NbaPlayers';
import dbConnect from '../../utils/dbConnect'
import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://evanemenegger:UXae5uEMtelJoptR@cluster0.d1andp0.mongodb.net/nba_stats?retryWrites=true&w=majority";
const MONGODB_DB = "nba_stats";

async function handler(req, res) {
  // console.log("reached handler!");
  if (req.method === "PATCH") {
    console.log("in patch method <--------------------------------------");
    const data = req.body.allPlayerData;
    const { firstName, lastName, personId, heightFeet, heightInches} = req.body.allPlayerData;
    console.log(firstName, lastName, personId, heightFeet, heightInches);

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const nbaStatsCollections = db.collection("nba_player_bio_stats");

    const filter = { "first_name": firstName, "last_name": lastName};
    const updateDoc = { $set: {
      imgSrc: `https://cdn.nba.com/headshots/nba/latest/1040x760/${personId}.png?imwidth=1040&imheight=760`,
    }}
    const result = await nbaStatsCollections.updateOne(filter, updateDoc);

    console.log('patch result', result);

    client.close();

    res.status(201).json(result);
  }
}

export default handler;


