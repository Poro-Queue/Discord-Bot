const { SlashCommandBuilder } = require('@discordjs/builders');

const listQueue = require('../../sub/listQueue.js');
const joinQueue = require('../../sub/joinQueue.js');
const leaveQueue = require('../../sub/leaveQueue.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Join the queue for a game')
    .addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription('List the queue for a game')
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('join')
            .setDescription('Join the queue for a game')
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('leave')
            .setDescription('Leave the queue for a game')
    ),
    async execute(interaction, client) {
        if (interaction.options.getSubcommand() === 'list') {
            await listQueue.execute(interaction, client);
        } else if (interaction.options.getSubcommand() === 'join') {
            await joinQueue.execute(interaction, client);
        } else if (interaction.options.getSubcommand() ) {
            await leaveQueue.execute(interaction, client);
        }
    }
}