module.exports = {
    async execute(interaction, client) {
        // get the guild display name of the user
        const userId = interaction.user.id;
        const username = interaction.guild.members.cache.get(userId).displayName;

        // check if player is registered

        let players = require('../../misc/players.js');

        let player = null;
        players.forEach((p) => { // this will get the player object from the players array
            if (p.name === username) player = p;
        });

        let queue = require('../../misc/queue.js');
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
        queue = queue.filter(p => p.name !== player.name);

        const fs = require('fs');
        fs.writeFileSync('./src/misc/queue.js', `module.exports = ${JSON.stringify(queue)}`);

        await interaction.reply({ content: `You have left the queue`, ephemeral: true });
    }
}