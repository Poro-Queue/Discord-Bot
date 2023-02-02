const { SlashCommandBuilder } = require('@discordjs/builders');

const listQueue = require('../../subcommands/queue/listQueue.js');
const joinQueue = require('../../subcommands/queue/joinQueue.js');
const leaveQueue = require('../../subcommands/queue/leaveQueue.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Join the queue for a game')
    .setDMPermission(false) // this command can only be used in a server
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
        } else if (interaction.options.getSubcommand() === 'leave') {
            await leaveQueue.execute(interaction, client);
        }
    }
}