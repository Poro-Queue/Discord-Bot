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

        const playersMessage = players.map(player => {
            let p = new Player(player.name, player.team, player.wins, player.losses, player.games);
            return `${p.getName()} from ${p.getTeam()} has ${p.getGames()} games. Win rate: ${p.getWinRate()}%`;
        }).join("\n");

        await interaction.editReply(playersMessage);
    }
}