const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Join the queue for a game'),
    async execute(interaction, client) {
        await interaction.reply('Pong!');
    }
}