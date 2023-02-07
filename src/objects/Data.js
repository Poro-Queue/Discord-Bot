const Database = require('./Database.js');
const db = new Database();

let players = [];
let queue = [];
let games = [];

module.exports = {
    initialize: async () => players = await db.getPlayers(),
    getPlayers: () => players,
    getQueue: () => queue,
    getGames: () => games,
    addPlayer: (player) => players.push(player),
    addPlayerToQueue: (player) => queue.push(player),
    addGame: (game) => games.push(game),
    updateQueue: (newQueue) => queue = newQueue,
    updatePlayers: () => this.initialize()
}