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

        const queue = require('../objects/queue.js');
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
        queue.splice(queue.indexOf(player), 1);

        const fs = require('fs');
        fs.writeFileSync('./src/objects/queue.js', `module.exports = ${JSON.stringify(queue)}`);

        await interaction.reply({ content: `You have left the queue`, ephemeral: true });
    }
}