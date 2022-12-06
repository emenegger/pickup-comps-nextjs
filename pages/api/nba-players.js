import NbaPlayers from '../../models/NbaPlayers';
import dbConnect from '../../utils/dbConnect'

export default async function handler(req, res) {
  const {method} = req
  
  dbConnect();

  if (method === 'GET') {
    try {
      const players = await NbaPlayers.find()
      res.status(200).json(players)
    } catch(err) {
        res.status(500).json(err)
    }
  }

  if (method === 'POST') {
    try {
      const player = await NbaPlayers.create(req.body)
      res.status(201).json(player)
    } catch(err) {
        res.status(500).json(err)
    }
  }
}