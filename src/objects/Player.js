module.exports = class Player {
    /**
     * @param {String} name the name of the player
     * @param {String} team the team of the player
     * @param {String} role the role of the player
     * @param {String} ign the in game name of the player
     * @param {Number} wins the wins of the player
     * @param {Number} losses the losses of the player
     * @param {Number} games the games of the player
     */
    constructor(name, team, role, ign, wins=0, losses=0, games=0) {
        this.name = name;
        this.team = team;
        this.role = role; // {Top, Jungle, Mid, ADC, Support}
        this.ign = ign;
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
     * @returns {String} the role of the player
     */
    getRole() {
        return this.role;
    }

    /**
     * @returns {String} the ign of the player
     */
    getIGN() {
        return this.ign;
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
        return (this.games === 0) ? 0 : (this.wins / (this.games)) * 100;
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
     * Set the role of the player
     * @param {String} role the new role of the player
     */
    setRole(role) {
        this.role = role;
    }

    /**
     * Set the ign of the player
     * @param {String} ign the new ign of the player
     */
    setIGN(ign) {
        this.ign = ign;
    }

    /**
     * @returns {String} the player's toString
     */
    toString() {
        return `${this.team} ${this.name} (${this.ign} - ${this.role}) has ${this.games} games. Win rate: ${this.getWinRate()}%`;
    }
}