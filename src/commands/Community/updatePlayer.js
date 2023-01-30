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
        option.setName('newname')
        .setDescription('Change the name of the player')
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('newteam')
        .setDescription('Change the team of the player')
        .setRequired(false)
    ),
    async execute(interaction, client) {
        // get the name of the player
        let name = interaction.options.getString('name');
        // get the new name of the player
        let newName = interaction.options.getString('newname');
        // get the new team of the player
        let newTeam = interaction.options.getString('newteam');


        // get the player from the database
        let player = await db.searchPlayer(name);
        console.log(player.toString());
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

        interaction.reply('Player updated ' + player.getName());
    }
}