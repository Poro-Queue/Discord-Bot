const { updateQueue, getQueue, getPlayers } = require('../../objects/Data.js');

module.exports = {
    async execute(interaction, client) {
        // get the guild display name of the user
        const userId = interaction.user.id;
        const username = interaction.guild.members.cache.get(userId).displayName;

        // check if player is registered
        const players = getPlayers();

        let player = null;
        players.forEach((p) => { // this will get the player object from the players array
            if (p.name === username) player = p;
        });

        const queue = getQueue();
        // check if the player is already in the queue
        let isInQueue = false;
        queue.forEach((p) => {
            if (p.name === player.name) isInQueue = true;
        });

        if (!isInQueue) {
            await interaction.reply({ content: `You are not in the queue`, ephemeral: true });
            return;
        }

        // remove the player from the queue
        let newQueue = queue.filter(p => p.name !== player.name);
        updateQueue(newQueue);

        await interaction.reply({ content: `You have left the queue`, ephemeral: true });
    }
}