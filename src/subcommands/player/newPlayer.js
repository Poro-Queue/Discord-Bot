const Player = require('../../objects/Player.js');

const Database = require('../../objects/Database.js');
const { addPlayer } = require('../../objects/Data.js');
const db = new Database();

module.exports = {
    async execute(interaction, client) {
        const name = interaction.options.getString('name');
        const role = interaction.options.getString('role');
        const ign = interaction.options.getString('ign');
        let team = interaction.options.getString('team');

        if (team === null) team = 'NoTeam';
        const player = new Player(name, team, role, ign); 
        
        // Update the players file
        addPlayer(player);

        // Add the player to the database
        db.addPlayer(player);

        // Send a message to the user
        await interaction.reply({content: player.toString(), ephemeral: true});
    }
}