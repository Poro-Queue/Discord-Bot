const { checkQueue, generateGame } = require('../game.js');
const { addPlayerToQueue, getPlayers, getQueue } = require('../../objects/Data.js');

module.exports = {
    async execute(interaction, client) {
        // get the guild display name of the user
        const userId = interaction.user.id;
        const username = interaction.guild.members.cache.get(userId).displayName;

        // check if player is registered

        const players = getPlayers();
        let player = null;

        players.forEach((p) => {
            if (p.name === username) player = p;
        });
        
        if (player == null) {
            await interaction.reply({ content: `Please register yourself with /register`, ephemeral: true });
            return;
        }

        const queue = getQueue();
        
        // check if the player is already in the queue
        let isInQueue = false;
        queue.forEach((p) => {
            if (p.name === player.name) {
                interaction.reply({ content: `You are already in the queue`, ephemeral: true });
                isInQueue = true;
            }
        });

        if (isInQueue) return;

        // TODO: Fix this (not getting added in the end of the queue)

        // add the player in the end of the queue
        addPlayerToQueue(player);

        const guild = client.guilds.cache.get(interaction.guildId)
        if (checkQueue()) generateGame(guild);
        else console.log('Not enough players to start a game');

        await interaction.reply({ content: `You have joined the queue`, ephemeral: true });
    }
}