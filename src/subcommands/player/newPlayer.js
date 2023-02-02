const Player = require('../../objects/Player.js');

const Database = require('../../objects/Database.js');
const db = new Database();

module.exports = {
    async execute(interaction, client) {
        const name = interaction.options.getString('name');
        const role = interaction.options.getString('role');
        const ign = interaction.options.getString('ign');
        let team = interaction.options.getString('team');

        if (team === null) team = 'NoTeam';
        const player = new Player(name, team, role, ign); 
        
        // Add the player to the database
        db.addPlayer(player);
        
        // Update the players file
        const players = require('../../objects/players.js');
        players.push(player);
        const fs = require('fs');
        fs.writeFileSync('./src/objects/players.js', `module.exports = ${JSON.stringify(players)}`);

        // Send a message to the user
        await interaction.reply({content: player.toString(), ephemeral: true});
    }
}