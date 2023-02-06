const { SlashCommandBuilder } = require('@discordjs/builders');
const { getPlayers } = require('../../objects/Data.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Get all registered players')
    .setDMPermission(false), // this command can only be used in a server
    async execute(interaction, client) {
        await interaction.reply({content: "Getting players...", ephemeral: true});

        let playersMessage = "Players:\n";
        
        const players = getPlayers();
        players.forEach((player) => {
            playersMessage += `- ${player.getTeam()} ${player.getName()}\n`;
        });
        
        if (players.length == 0) {
            playersMessage = "There are no players registered";
        }

        await interaction.editReply({content: playersMessage, ephemeral: true});
    }
}