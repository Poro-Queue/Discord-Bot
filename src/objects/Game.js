const Team = require('./Team');

class Game {
    constructor(id, players) {
        this.id = id;
        this.players = players;
        this.blue = new Team(true);
        this.red = new Team(false);
        // function to randomly assign the players to the teams (50/50 chance for each role)
        // function to end the game, remove the players from the list of games being played and delete the channel and permission of this game
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
        // TODO: Assign the players to the teams
    }

    endGame() {
        // TODO: End the game
    }
}

module.exports = Game;