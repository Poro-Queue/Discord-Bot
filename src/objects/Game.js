const Team = require('./Team');

class Game {
    /**
     * @param {Number} id the id of the game
     * @param {Object} players the players of the game {Top: Players, Jungle: Players, Mid: Players, ADC: Players, Support: Players}
     */
    constructor(id, players) {
        this.id = id;
        this.players = players;
        this.blue = new Team(true);
        this.red = new Team(false);

        /* Functions */
        this.assignPlayers();
    }

    /**
     * @returns {Number} the id of the game
     */
    getId() {
        return this.id;
    }

    /**
     * @returns {Array} the players of the game
     */
    getPlayers() {
        return this.players;
    }

    /**
     * @returns {Team} the blue team
    */
    getBlue() {
        return this.blue;
    }

    /**
     * @returns {Team} the red team
     */
    getRed() {
        return this.red;
    }

    assignPlayers() {
        // reorganize the players by role
        const roles = Object.keys(this.players);
        roles.forEach(role => {
            var result = Math.random() < 0.5;
            this.blue.addPlayer(this.players[role][Math.abs(result - 1)]);
            this.red.addPlayer(this.players[role][Number(result)]);
        });

        console.log('\n');
        this.blue.getTeamPlayers().forEach(player => {
            process.stdout.write(player.name + ", ");
        })
        console.log('\n---\nvs\n---');
        this.red.getTeamPlayers().forEach(player => {
            process.stdout.write(player.name + ", ");
        })
        console.log('\n');
    }

    startGame() {
        // TODO: Start the game (create a game channel, add permissions to the players, etc.)
    }

    endGame() {
        // TODO: End the game
    }
        
}

module.exports = Game;