const Database = require('../objects/Database');
const db = new Database();
db.connect();

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Action!');

        // Get the players from the database
        const players = await db.getPlayers();

        // Update the players file
        const fs = require('fs');
        fs.writeFile('./src/objects/vars.js', `const players = ${JSON.stringify(players)};\nconst queue = [];\n\nconst arrays = { players, queue }\n\nmodule.exports = arrays;`, (error) => {
                if (error) throw error;
            }
        );

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,
                        },
                    ],
                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};