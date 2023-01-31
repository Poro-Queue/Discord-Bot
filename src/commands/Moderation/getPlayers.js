const { SlashCommandBuilder } = require('@discordjs/builders');

const Player = require('../../objects/Player.js');
const players = require('../../objects/vars.js').players;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Get the players in the database'),
    async execute(interaction, client) {
        await interaction.reply("Getting players...");

        let playersMessage = "Players:\n";
        players.forEach((player) => {
            let p = new Player(player.name, player.team, player.wins, player.losses, player.games);
            playersMessage += `- ${p.getTeam()} ${p.getName()}\n`;
        });
        
        await interaction.editReply(playersMessage);
    }
}