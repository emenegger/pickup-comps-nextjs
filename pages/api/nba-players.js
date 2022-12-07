// import NbaPlayers from '../../models/NbaPlayers';
import dbConnect from '../../utils/dbConnect'
import { MongoClient } from "mongodb";

const MONGODB_URI =
  "mongodb+srv://evanemenegger:UXae5uEMtelJoptR@cluster0.d1andp0.mongodb.net/nba_stats?retryWrites=true&w=majority";
const MONGODB_DB = "nba_stats";

async function handler(req, res) {
  console.log("reached handler!");
  if (req.method === "PATCH") {
    console.log("in patch method <--------------------------------------");
    const { player_id, player_bio } = req.body;
    console.log('player_id', player_id,'player_bio', player_bio);

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const nbaStatsCollections = db.collection("nba_player_stats");

    const filter = { "data.player_id": player_id };
    const updateDoc = { $set: {
      player_bio: player_bio,
    }}
    const result = await nbaStatsCollections.updateOne(filter, updateDoc);

    console.log('patch result', result);

    client.close();

    res.status(201).json(result);
  }
  if (req.method === "POST") {
    console.log("in post method <--------------------------------------");
    const { playerData } = req.body;

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db();
    const nbaStatsCollections = db.collection("nba_player_bio_stats");

    const result = await nbaStatsCollections.insertMany(playerData);

    client.close();

    res.status(201).json({ message: "successful insertion" });

  }
}

export default handler;


// export default async function handler(req, res) {
//   const {method} = req
  
//   dbConnect();

//   if (method === 'GET') {
//     try {
//       const players = await NbaPlayers.find()
//       res.status(200).json(players)
//     } catch(err) {
//         res.status(500).json(err)
//     }
//   }

//   if (method === 'POST') {
//     try {
//       const player = await NbaPlayers.create(req.body)
//       res.status(201).json(player)
//     } catch(err) {
//         res.status(500).json(err)
//     }
//   }
// }