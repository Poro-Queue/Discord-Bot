const Database = require('./Database.js');
const db = new Database();

intializePlayers = async () => {
    players = await db.getPlayers();
    console.log('Players updated')
}

let players = [];
intializePlayers()

let queue = [];
let games = [];

module.exports = {
    getPlayers: () => players,
    getQueue: () => queue,
    getGames: () => games,
    addPlayer: (player) => players.push(player),
    addPlayerToQueue: (player) => queue.push(player),
    addGame: (game) => games.push(game),
    updateQueue: (newQueue) => queue = newQueue
}