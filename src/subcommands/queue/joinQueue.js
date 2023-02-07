const { checkQueue, generateGame } = require('../game.js');
const { addPlayerToQueue, getPlayers, getQueue, getGames } = require('../../objects/Data.js');

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
        let toggle = false;
        queue.forEach((p) => {
            if (p.name === player.name) {
                interaction.reply({ content: `You are already in the queue`, ephemeral: true });
                toggle = true;
            }
        });

        // check if the player is already in a game
        const games = getGames();
        games.forEach((game) => { // game.players = [top: [player1, player2], jg: [player3, player4], ...]
            for (const role in game.players) {
                game.players[role].forEach((p) => {
                    if (p.name === player.name) {
                        interaction.reply({ content: `You are already in a game`, ephemeral: true });
                        toggle = true;
                    }
                });
            }
        });

        if (toggle) return;

        // TODO: Fix this (not getting added in the end of the queue)

        // add the player in the end of the queue
        // updateQueue([{"name":"Jankos","team":"TH","role":"Jungle","ign":"thePizzaBox","wins":0,"losses":0,"games":0},{"name":"Yike","team":"G2","role":"Jungle","ign":"Yike","wins":0,"losses":0,"games":0},{"name":"Caps","team":"G2","role":"Mid","ign":"Rasmus","wins":0,"losses":0,"games":0},{"name":"Perkz","team":"VIT","role":"Mid","ign":"Perkz","wins":0,"losses":0,"games":0},{"name":"BrokenBlade","team":"G2","role":"Top","ign":"TopFather","wins":0,"losses":0,"games":0},{"name":"Wunder","team":"FNC","role":"Top","ign":"Martin","wins":0,"losses":0,"games":0},{"name":"Neon","team":"VIT","role":"ADC","ign":"Neon","wins":0,"losses":0,"games":0},{"name":"Rekkles","team":"FNC","role":"ADC","ign":"Rekkles","wins":0,"losses":0,"games":0},{"name":"Mikyx","team":"G2","role":"Support","ign":"Mikyx","wins":0,"losses":0,"games":0},{"name":"Kaiser","team":"VIT","role":"Support","ign":"Kaiser","wins":0,"losses":0,"games":0},{"name":"Mersa","team":"TH","role":"Support","ign":"Mersa","wins":0,"losses":0,"games":0},{"name":"BO","team":"VIT","role":"Jungle","ign":"zyb","wins":0,"losses":0,"games":0}]);
        addPlayerToQueue(player);

        const guild = client.guilds.cache.get(interaction.guildId)
        if (checkQueue()) generateGame(guild);
        else console.log('Not enough players to start a game');

        await interaction.reply({ content: `You have joined the queue`, ephemeral: true });
    }
}