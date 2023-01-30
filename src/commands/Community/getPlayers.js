const { SlashCommandBuilder } = require('@discordjs/builders');


const Player = require('../../objects/Player.js');
const Database = require('../../objects/Database.js');
const db = new Database();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Get the players in the database'),
    async execute(interaction, client) {
        await interaction.reply("Getting players...");
        const players = await db.getPlayers();

        let playersMessage = "Players:\n";
        players.forEach((player) => {
            playersMessage += `- ${player.getTeam()} ${player.getName()}\n`;
        });
        
        await interaction.editReply(playersMessage);
    }
}