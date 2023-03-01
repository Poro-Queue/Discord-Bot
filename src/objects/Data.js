const Database = require('./Database.js');
const db = new Database();

let players = [];
let queue = [];
let games = [];

// TODO: get the players from the API instead of the database

module.exports = {
    initialize: async () => players = await db.getPlayers(),
    getPlayers: () => players,
    getQueue: () => queue,
    getGames: () => games,
    addPlayer: (player) => {
        // verify if the player.name is already in the database
        if (players.find((p) => p.getName() === player.getName())) return false;
        db.addPlayer(player);
        players.push(player);
        return true;
    },
    addPlayerToQueue: (player) => queue.push(player),
    addGame: (game) => games.push(game),
    updateQueue: (newQueue) => queue = newQueue,
    updatePlayers: () => initialize()
}