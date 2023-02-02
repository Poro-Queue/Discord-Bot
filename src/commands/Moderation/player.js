const { SlashCommandBuilder } = require('@discordjs/builders');

const newPlayer = require('../../subcommands/player/newPlayer.js');
const updatePlayer = require('../../subcommands/player/updatePlayer.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('player')
    .setDescription('Player management')
    .setDMPermission(false) // this command can only be used in a server
    .addSubcommand(subcommand =>
        subcommand
            .setName('new')
            .setDescription('Create a new player')
            .addStringOption(option =>
                option.setName('name')
                .setDescription('The name of the player')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('role')
                .setDescription('The role of the player')
                .setRequired(true)
                .addChoices({name:'Top', value:'Top'},{name:'Jungle', value:'Jungle'},{name:'Mid', value:'Mid'},{name:'ADC', value:'ADC'},{name:'Support', value:'Support'})
            )
            .addStringOption(option =>
                option.setName('ign')
                .setDescription('The in-game name of the player')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('team')
                .setDescription('The team of the player')
                .setRequired(false)
            )
    )
    .addSubcommand(subcommand =>
        subcommand
            .setName('update')
            .setDescription('Update a player')
            .addStringOption(option =>
                option.setName('name')
                .setDescription('Get the player with the name')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('new_team')
                .setDescription('Change the team of the player')
                .setRequired(false)
            )
            .addStringOption(option =>
                option.setName('new_name')
                .setDescription('Change the name of the player')
                .setRequired(false)
            )
            // update new role but its a dropdown
            .addStringOption(option =>
                option.setName('new_role')
                .setDescription('Change the role of the player')
                .setRequired(false)
                .addChoices({name:'Top', value:'Top'},{name:'Jungle', value:'Jungle'},{name:'Mid', value:'Mid'},{name:'ADC', value:'ADC'},{name:'Support', value:'Support'})
            )
            .addStringOption(option =>
                option.setName('new_ign')
                .setDescription('Change the in-game name of the player')
                .setRequired(false)
            )
    ),
    async execute(interaction, client) {
        if (interaction.options.getSubcommand() === 'new') {
            await newPlayer.execute(interaction, client);
        } else if (interaction.options.getSubcommand() === 'update') {
            await updatePlayer.execute(interaction, client);
        }
    }
}