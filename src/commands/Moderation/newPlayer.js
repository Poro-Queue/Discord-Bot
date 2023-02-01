const { SlashCommandBuilder } = require('@discordjs/builders');

const Player = require('../../objects/Player.js');

const Database = require('../../objects/Database.js');
const db = new Database();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('new_player')
    .setDescription('Create a new player')
    .addStringOption(option =>
        option.setName('name')
        .setDescription('The name of the player')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('role')
        .setDescription('The role of the player')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('team')
        .setDescription('The team of the player')
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('ign')
        .setDescription('The in-game name of the player')
        .setRequired(false)
    ),
    async execute(interaction, client) {
        const name = interaction.options.getString('name');
        const team = interaction.options.getString('team');
        const role = interaction.options.getString('role');
        const ign = interaction.options.getString('ign');

        let player;
        if (ign === null && team === null) player = new Player(name, role=role); 
        else if (ign === null) player = new Player(name, team, role);
        else if (team === null) player = new Player(name, role=role, ign=ign);
        else player = new Player(name, team, role, ign);
        
        // Add the player to the database
        db.addPlayer(player);
        
        // Update the players file
        const players = require('../../objects/players.js');
        players.push(player);
        const fs = require('fs');
        fs.writeFileSync('./src/objects/players.js', `module.exports = ${JSON.stringify(players)}`);

        // Send a message to the user
        await interaction.reply(player.toString());
    }
}


// TODO: change this. Player will be added from the website and not from Discord