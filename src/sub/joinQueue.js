module.exports = {
    async execute(interaction, client) {
        // get the guild display name of the user
        const userId = interaction.user.id;
        const username = interaction.guild.members.cache.get(userId).displayName;

        // check if player is registered

        const players = require('../objects/players.js');
        let player = null;

        players.forEach((p) => {
            if (p.name === username) player = p;
        });
        
        if (player == null) {
            await interaction.reply({ content: `Please register yourself with /register`, ephemeral: true });
            return;
        }

        const queue = require('../objects/queue.js');
        // check if the player is already in the queue
        let isInQueue = false;
        queue.forEach((p) => {
            if (p.name === player.name) {
                interaction.reply({ content: `You are already in the queue`, ephemeral: true });
                isInQueue = true;
            }
        });

        if (isInQueue) return;

        // add the player in the end of the queue
        queue.push(player);
        const fs = require('fs');
        fs.writeFileSync('./src/objects/queue.js', `module.exports = ${JSON.stringify(queue)}`);

        await interaction.reply({ content: `You have joined the queue`, ephemeral: true });

        // TODO: now that the one more player has joined the queue, check if there are enough players to start a game
    }
}