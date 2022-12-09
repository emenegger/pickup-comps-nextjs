// addPlayerData();
  // let playerInfo = [];
  const playerInfo = {};

  // adding player names and bios to database
  export const addNames = async () => {
    // fetch the data from the ball don't lie api
    // iterate through each page of all of the players
    for (let i = 26; i < 39; i++) {
      const result = await axios.get(
        `https://www.balldontlie.io/api/v1/players/?per_page=100&page=${i}`
      );
      let data = result.data.data;
      // iterate through each player in the page
      data.forEach(player => {
        playerInfo[player.id] = player;
      });
    }
    let queryString = 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]='
    const playerArr = Object.values(playerInfo);
    for (let i = playerArr.length - 1; i > playerArr.length - 1200; i--) {
      queryString += `${playerArr[i].id},`;
    }
    // playerInfo.forEach(player => {
    //   queryString += `${player.id},`;
    // })
    queryString = queryString.slice(0, queryString.length - 1)

    console.log('playerInfo', playerInfo);

    console.log('query string', queryString);

    console.log('query result', axios.get(queryString));

    // for each player in the result from the season averages query:
    // merge in bio data and then send that info to the db
    const result = await axios.get(queryString);
    result.data.data.forEach(player => {
      Object.assign(player, playerInfo[player.player_id]);
      // Object.assign(player, {_id: player.id})
      player._id = player.id
      delete player.id
      delete player.player_id
    })
    console.log('playerInfo', playerInfo)
    console.log('result', result.data.data)
    // add this entire result to the mongoDb db
    await axios
      .post("/api/nba-players", {
        playerData: result.data.data,
      })
      .then((response) => console.log("response in addNames", response))
      .catch((err) => console.log(err));
  };