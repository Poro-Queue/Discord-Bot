const { ChannelType, PermissionsBitField } = require('discord.js');
const Team = require('./Team');

module.exports = class Game {
    /**
     * @param {Number} id the id of the game
     * @param {Object} players the players of the game {Top: Players, Jungle: Players, Mid: Players, ADC: Players, Support: Players}
     */
    constructor(id, players) {
        this.id = id;
        this.players = players;
        this.blue = new Team(true);
        this.red = new Team(false);
        
        this.toDel = [];

        /* Functions */
        this.assignPlayers();
    }

    /**
     * Function to assign the players to the teams
     */
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
        // Create a game group channel
        const category = await createCategory(guild, this.id);
        
        // Create a permission called: Blue#id and Red#id
        const blueRole = await createRole(guild, `Blue#${this.id}`, '#0000FF');
        const redRole = await createRole(guild, `Red#${this.id}`, '#FF0000');

        // Create a general game channel
        const generalChannel = await createChannel(guild, 'Lobby', category, ChannelType.GuildText);
        allowRole(blueRole, generalChannel);
        allowRole(redRole, generalChannel);

        //TODO: Bot send a message to the general channel explaining how this works and which are the red and blue team

        // Create a game channel and voice channel for Blue team
        const blueChannel = await createChannel(guild, 'blue', category, ChannelType.GuildVoice);
        allowRole(blueRole, blueChannel);
        
        // Create a game channel and voice channel for Red team
        const redChannel = await createChannel(guild, 'red', category, ChannelType.GuildVoice);
        allowRole(redRole, redChannel);
        
        // Give the players a role to see the game group channel
        givePlayerRole(guild, this.blue.players, blueRole);
        givePlayerRole(guild, this.red.players, redRole);
        
        this.toDel.push(category, generalChannel, blueChannel, redChannel, blueRole, redRole);

        // TODO: Register the game in the website
    }

    /**
     * Function to end the game
     * Delete all the channels and roles
     */
    endGame() {
        this.toDel.forEach(element => {
            element.delete();
        });
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
        color,
        permissionOverwrites: [{
            id: guild.roles.everyone, 
            deny: [ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect ]
        }]
    })
    return role;
}

/**
 * Function to create a channel
 * @param {Guild} guild
 * @param {String} name - the name of the channel
 * @param {CategoryChannel} category - the category the channel is in
 * @param {ChannelType} type - the type of the channel
 */
const createChannel = async (guild, name, category, type) => await guild.channels.create({ name, type, parent: category });

// Function to give the players a role to see the game group channel
const givePlayerRole = (guild, teamPlayers, role) => {
    teamPlayers.forEach(player => {
        // get the player id by display name
        let member = guild.members.cache.find(member => member.displayName === player.name);
        if (member) member.roles.add(role);
    });
}

// Function to allow a role to see a category
const allowRole = async (role, category) => {
    await category.permissionOverwrites.edit(role.id, { ViewChannel : true, Connect: true })
}