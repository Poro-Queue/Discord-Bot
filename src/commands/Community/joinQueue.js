const { SlashCommandBuilder } = require('@discordjs/builders');

const Database = require('../../objects/Database.js');
const db = new Database();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Join the queue for a game'),
    async execute(interaction, client) {
        // get the guild display name of the user
        const userId = interaction.user.id;
        const username = interaction.guild.members.cache.get(userId).displayName;

        const player = await db.getPlayer(username);
        console.log(player);

        if (player == null) {
            await interaction.reply({ content: `Please register yourself with /register`, ephemeral: true });
            return;
        }

        const queue = require('../../objects/queue.js');
        // check if the player is already in the queue
        queue.forEach((p) => {
            if (p.name === player.name) {
                interaction.reply({ content: `You are already in the queue`, ephemeral: true });
                return;
            }
        });

        // add the player in the end of the queue
        queue.push(player);
        const fs = require('fs');
        fs.writeFileSync('./src/objects/queue.js', `module.exports = ${JSON.stringify(queue)}`);

        await interaction.reply({ content: `You have joined the queue`, ephemeral: true });
    }
}