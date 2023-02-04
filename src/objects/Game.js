const { ChannelType, PermissionsBitField } = require('discord.js');
const Team = require('./Team');

module.exports = class Game {
    /**
     * @param {Number} id the id of the game
     * @param {Object} players the players of the game {Top: Players, Jungle: Players, Mid: Players, ADC: Players, Support: Players}
     */
    constructor(id, players) {
        this._id = id;
        this._players = players;
        this._blue = new Team(true);
        this._red = new Team(false);

        /* Functions */
        this.assignPlayers();
    }

    /**
     * @returns {Number} the id of the game
     */
    get id() {
        return this._id;
    }

    /**
     * @returns {Array} the players of the game
     */
    get players() {
        return this._players;
    }

    /**
     * @returns {Team} the blue team
    */
    get blue() {
        return this._blue;
    }

    /**
     * @returns {Team} the red team
     */
    get red() {
        return this._red;
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
        this.blue.players.forEach(player => {
            process.stdout.write(player.name + ", ");
        })
        console.log('\n---\nvs\n---');
        this.red.players.forEach(player => {
            process.stdout.write(player.name + ", ");
        })
        console.log('\n');
    }

    /**
     * Function to start the game
     * @param {Guild} guild the guild the game is being played in
     */
    async startGame(guild) {
        // TODO: LIST OF THINGS TO DO
        // - Create a game channel (one for each team) in that category
        // - Create a game voice channel (one for each team) in that category
        
        // Create a game group channel
        const category = await createCategory(guild, this.id);
        
        // Create a permission called: Blue#id and Red#id
        const blueRole = await createRole(guild, `Blue#${this.id}`, '#0000FF');
        const redRole = await createRole(guild, `Red#${this.id}`, '#FF0000');

        // Give the players a role to see the game group channel
        givePlayerRole(guild, this.blue.players, blueRole);
        givePlayerRole(guild, this.red.players, redRole);

        // Allow the roles to see the specific category
        allowRole(blueRole, category);
        allowRole(redRole, category);
    }

    endGame() {
        // TODO: LIST OF THINGS TO DO
        // - Delete the game group channel
        // - Delete all the permissions
        // - Remove this game from the games array
    }
}


/* Private functions */

// Function to create a category channel
const createCategory = async (guild, id) => {
    const category = await guild.channels.create({
        name: `# Game-${id}`,
        type: ChannelType.GuildCategory,
        permissionOverwrites: [
            { id: guild.roles.everyone, deny: [PermissionsBitField.Flags.ViewChannel] },
        ],
    });
    return category;
};

// Function to create a role
const createRole = async (guild, name, color) => {
    const role = await guild.roles.create({
        name,
        color
    })
    return role;
}

// Function to give the players a role to see the game group channel
const givePlayerRole = (guild, teamPlayers, role) => {
    teamPlayers.forEach(player => {
        // get the player id by display name
        let member = guild.members.cache.find(member => member.displayName === player.name);
        if (member) {
            member.roles.add(role);
        }
    });
}

// Function to allow a role to see a category
const allowRole = async (role, category) => {
    await category.permissionOverwrites.edit(role.id, { ViewChannel : true })
}