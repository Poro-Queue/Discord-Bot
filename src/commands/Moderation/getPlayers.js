const { SlashCommandBuilder } = require('@discordjs/builders');

const Player = require('../../objects/Player.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Get all registered players'),
    async execute(interaction, client) {
        await interaction.reply("Getting players...");

        let playersMessage = "Players:\n";
        
        const players = require('../../objects/players.js');
        players.forEach((player) => {
            let p = new Player(player.name, player.team, player.wins, player.losses, player.games);
            playersMessage += `- ${p.getTeam()} ${p.getName()}\n`;
        });
        
        await interaction.editReply(playersMessage);
    }
}