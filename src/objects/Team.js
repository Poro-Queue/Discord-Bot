module.exports = class Team {
    /**
     * @param {boolean} side true if the team is blue, false if the team is red
     * @param {Array} players the players of the team
     */
    constructor(side) {
        this._side = side;
        this._players = [];
    }

    /**
     * @returns {String} the side of the team (blue or red)
     */
    getSide() {
        return this.side ? 'blue' : 'red';
    }

    /**
     * @returns {Array} the players of the team
     */
    get players() {
        return this._players;
    }

    /**
     * Add a player to the team
     * @param {Player} player the player to add to the team
     */
    addPlayer(player) {
        this._players.push(player);
    }
}