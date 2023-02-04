const { SlashCommandBuilder } = require('@discordjs/builders');

// This is the main command, call a subcommand with /ping <subcommand>

const Game = require('../../objects/Game.js');
const players = {
    Top: [
        {"name":"BrokenBlade","team":"G2","role":"Top","ign":"TopFather","wins":0,"losses":0,"games":0},
        {"name":"Wunder","team":"FNC","role":"Top","ign":"Martin","wins":0,"losses":0,"games":0}
    ],
    Jungle: [
        {"name":"Jankos","team":"TH","role":"Jungle","ign":"thePizzaBox","wins":0,"losses":0,"games":0},
        {"name":"Yike","team":"G2","role":"Jungle","ign":"Yike","wins":0,"losses":0,"games":0}
    ],
    Mid: [
        {"name":"Caps","team":"G2","role":"Mid","ign":"Rasmus","wins":0,"losses":0,"games":0},
        {"name":"Perkz","team":"VIT","role":"Mid","ign":"Perkz","wins":0,"losses":0,"games":0}
    ],
    ADC: [
        {"name":"Neon","team":"VIT","role":"ADC","ign":"Neon","wins":0,"losses":0,"games":0},
        {"name":"Rekkles","team":"FNC","role":"ADC","ign":"Rekkles","wins":0,"losses":0,"games":0}
    ],
    Support: [
        {"name":"Mikyx","team":"G2","role":"Support","ign":"Mikyx","wins":0,"losses":0,"games":0},
        {"name":"Kaiser","team":"VIT","role":"Support","ign":"Kaiser","wins":0,"losses":0,"games":0}
    ]
}
const game = new Game(1, players);

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
        const guild = client.guilds.cache.get(interaction.guildId)
        if (interaction.options.getSubcommand() === 'pong') {
            game.startGame(guild);
            await interaction.reply({ content: 'Pong!', ephemeral: true});
        } else if (interaction.options.getSubcommand() === 'foo') {
            game.endGame(guild);
            await interaction.reply({ content: 'Foo!', ephemeral: true});
        }
    }
};