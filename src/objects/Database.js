const mysql = require('mysql2');

require('dotenv').config();

const Player = require('./Player');

// Create a object to manage the database
class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    /**
     * Connect to the database
     */
    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
            console.log('Connected as id ' + this.connection.threadId);
        });

        const query = `CREATE TABLE IF NOT EXISTS playerTable (
            name VARCHAR(255) NOT NULL PRIMARY KEY,
            team VARCHAR(255) NOT NULL,
            wins INT NOT NULL,
            losses INT NOT NULL,
            games INT NOT NULL
        )`;

        // Create the player table if it doesn't exist
        this.connection.query(query ,(error, results) => {
            if (error) throw error;
            console.log(results);
        });
    }

    /**
     * Disconnect from the database
     */
    disconnect() {
        this.connection.end();
    }

    /**
     * Print tables in the database
     */
    showTables() {
        this.connection.query('SHOW TABLES', (error, results) => {
            if (error) throw error;
            console.log(results);
        });
    }

    /**
     * Print all the players in the database
     */
    async getPlayers() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM playerTable', (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    /**
     * Search the player by name in the database
     */
    async searchPlayer(name) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM playerTable WHERE name = '${name}'`, (error, results) => {
                if (error) reject(error);
                results = results[0];
                resolve(new Player(results.name, results.team, results.wins, results.losses, results.games));
            });
        });
    }

    /**
     * Add a player to the database
     * @param {Player} player
     */
    addPlayer(player) {
        const name = player.getName();
        const team = player.getTeam();
        const wins = player.getWins();
        const losses = player.getLosses();
        const games = player.getGames();

        this.connection.query(`INSERT INTO playerTable (name, team, wins, losses, games) VALUES ('${name}', '${team}', ${wins}, ${losses}, ${games})`, (error, results) => {
            if (error) throw error;
            console.log(results);
        });
    }

    /**
     * Update a player in the database
     * @param {Player} player
     * @param {String} old - The old name of the player
     */
    updatePlayer(player, old) {
        const name = player.getName();
        const team = player.getTeam();
        const wins = player.getWins();
        const losses = player.getLosses();
        const games = player.getGames();

        this.connection.query(`UPDATE playerTable SET name = '${name}', team = '${team}', wins = ${wins}, losses = ${losses}, games = ${games} WHERE name = '${old}'`, (error, results) => {
            if (error) throw error;
            console.log(results);
        });
    }
}

module.exports = Database;