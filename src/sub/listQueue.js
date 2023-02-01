module.exports = {
    async execute(interaction, client) {
        const queue = require('../objects/queue.js');
        
        if (queue.length === 0) {
            await interaction.reply({ content: "**The queue is empty**", ephemeral: true });
            return;
        }

        let queueString = 'On queue:\n';
        queue.forEach((p) => {
            queueString += `- ${p.team} ${p.name} (${p.ign})\n`;
        });

        await interaction.reply({ content: "```\n" + queueString + "\n```", ephemeral: true });
    }
}