class Player {
    constructor(name, team, wins=0, losses=0, games=0) {
        this.name = name; // Gamer name
        this.team = team;
        this.wins = wins;
        this.losses = losses;
        this.games = games;
    }

    /**
     * @returns {String} the name of the player
     */
    getName() {
        return this.name;
    }

    /**
     * @returns {String} the team of the player
     */
    getTeam() {
        return this.team;
    }

    /**
     * @returns {Number} the wins of the player
     */
    getWins() {
        return this.wins;
    }

    /**
     * @returns {Number} the losses of the player
     */
    getLosses() {
        return this.losses;
    }

    /**
     * @returns {Number} the games of the player
     */
    getGames() {
        return this.games;
    }

    /**
     * Add a win to the player
     */
    addWin() {
        this.wins++;
        this.games++;
    }

    /**
     * Add a loss to the player
     */
    addLoss() {
        this.losses++;
        this.games++;
    }

    /**
     * Calculate the win rate of the player
     * @returns {Number} the win rate of the player
     */
    getWinRate() {
        return (this.games === 0) ? 0 : this.wins / (this.games);
    }

    /**
     * Set the name of the player
     * @param {String} name the name of the player
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Set the team of the player
     * @param {String} team the team of the player
     */
    setTeam(team) {
        this.team = team;
    }

    /**
     * @returns {String} the player's toString
     */
    toString() {
        return `${this.name} from ${this.team} has ${this.games} games. Win rate: ${this.getWinRate()}%`;
    }
}

module.exports = Player;