const { SlashCommandBuilder } = require('@discordjs/builders');

// This is the main command, call a subcommand with /ping <subcommand>

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('This is a ping command')
        .addSubcommand(subcommand =>
            subcommand
                .setName('pong')
                .setDescription('This is a pong command'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('foo')
                .setDescription('This is a foo command')),
    async execute(interaction, client) {
        if (interaction.options.getSubcommand() === 'pong') {
            await interaction.reply('Pong!');
        } else if (interaction.options.getSubcommand() === 'foo') {
            await interaction.reply('Foo!');
        }
    }
};