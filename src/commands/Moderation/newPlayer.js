const { SlashCommandBuilder } = require('@discordjs/builders');

const Player = require('../../objects/Player.js');

const players = require('../../objects/vars.js').players;

const Database = require('../../objects/Database.js');
const db = new Database();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('new')
    .setDescription('Create a new player')
    .addStringOption(option =>
        option.setName('name')
        .setDescription('The name of the player')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('team')
        .setDescription('The team of the player')
        .setRequired(true)
    ),
    async execute(interaction, client) {
        const name = interaction.options.getString('name');
        const team = interaction.options.getString('team');

        // Create a new player with the provided name
        const player = new Player(name, team);

        // Add the player to the database
        db.addPlayer(player);
        
        // Update the players file
        players.push(player);
        const fs = require('fs');
        fs.writeFile('./src/objects/vars.js', `const players = ${JSON.stringify(players)};\nconst queue = [];\n\nconst arrays = { players, queue }\n\nmodule.exports = arrays;`, (error) => {
                if (error) throw error;
            }
        );

        // Send a message to the user
        await interaction.reply(player.toString());
    }
}


// TODO: change this. Player will be added from the website and not from Discord