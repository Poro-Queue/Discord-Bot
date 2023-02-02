const { SlashCommandBuilder } = require('@discordjs/builders');

const Player = require('../../objects/Player.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('players')
    .setDescription('Get all registered players')
    .setDMPermission(false), // this command can only be used in a server
    async execute(interaction, client) {
        await interaction.reply({content: "Getting players...", ephemeral: true});

        let playersMessage = "Players:\n";
        
        const players = require('../../objects/players.js');
        players.forEach((player) => {
            let p = new Player(player.name, player.team, player.role, player.ign, player.wins, player.losses, player.games);
            playersMessage += `- ${p.getTeam()} ${p.getName()}\n`;
        });
        
        if (players.length == 0) {
            playersMessage = "There are no players registered";
        }

        await interaction.editReply({content: playersMessage, ephemeral: true});
    }
}