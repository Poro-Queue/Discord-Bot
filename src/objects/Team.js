class Team {
    /**
     * @param {boolean} side true if the team is blue, false if the team is red
     * @param {Array} players the players of the team
     */
    constructor(side) {
        this.side = side;
        this.players = [];
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
    getTeamPlayers() {
        return this.players;
    }

    /**
     * Sets the players of the team
     * @param {Array} players the players of the team
     */
    setPlayers(players) {
        this.players = players;
    }
}

module.exports = Team;