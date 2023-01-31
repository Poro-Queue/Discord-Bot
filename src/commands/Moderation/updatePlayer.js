const { SlashCommandBuilder } = require('@discordjs/builders');

const Database = require('../../objects/Database.js');
const db = new Database();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Get the players in the database')
    .addStringOption(option =>
        option.setName('name')
        .setDescription('Get the player with the name')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('new_name')
        .setDescription('Change the name of the player')
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('new_team')
        .setDescription('Change the team of the player')
        .setRequired(false)
    ),
    async execute(interaction, client) {
        // get the name of the player
        let name = interaction.options.getString('name');
        // get the new name of the player
        let newName = interaction.options.getString('new_name');
        // get the new team of the player
        let newTeam = interaction.options.getString('new_team');


        // get the player from the database
        let player = await db.getPlayer(name);
        if (player === null) {
            interaction.reply('Player not found');
            return;
        }

        if (newName !== null && newName !== name) {
            // TODO: check if the name dont have any weird characters
            player.setName(newName); // Update the player name
        }

        if (newTeam !== null && newTeam !== player.getTeam()) {
            player.setTeam(newTeam); // Update the player team
        }

        console.log(player.toString()); // works!!

        db.updatePlayer(player, name); // Update the player in the database

        // Update the players file
        const players = require('../../objects/players.js');

        players.forEach((p, index) => {
            if (p.name === name) {
                players[index] = player;
            }
        });

        const fs = require('fs');
        fs.writeFileSync('./src/objects/players.js', `module.exports = ${JSON.stringify(players)}`);

        // Reply to the user
        interaction.reply('Player updated ' + player.getName());
    }
}