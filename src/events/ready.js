const Database = require('../objects/Database');
const db = new Database();
db.connect();

const Data = require('../objects/Data.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Action!');
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