const { getQueue } = require("../../objects/Data");

module.exports = {
    async execute(interaction, client) {
        const queue = getQueue();
        
        if (queue.length === 0) {
            await interaction.reply({ content: "**The queue is empty**", ephemeral: true });
            return;
        }

        let queueString = 'On queue:\n';
        queue.forEach((p) => {
            queueString += `- ${p.team} ${p.name} (${p.ign}) - ${p.role}\n`;
        });

        await interaction.reply({ content: "```\n" + queueString + "\n```", ephemeral: true });
    }
}