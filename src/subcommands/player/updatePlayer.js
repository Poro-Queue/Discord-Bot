const { SlashCommandBuilder } = require('@discordjs/builders');

const Database = require('../../objects/Database.js');
const db = new Database();

module.exports = {
    async execute(interaction, client) {
        // get the name of the player
        let name = interaction.options.getString('name');
        // get the new name of the player
        let newName = interaction.options.getString('new_name');
        // get the new team of the player
        let newTeam = interaction.options.getString('new_team');
        // get the new role of the player
        let newRole = interaction.options.getString('new_role');
        // get the new ign of the player
        let newIgn = interaction.options.getString('new_ign');

        // get the player from the database
        let player = await db.getPlayer(name);
        if (player === null) {
            interaction.reply({content: 'Player not found', ephemeral: true});
            return;
        }

        let changeFlag = false;
        if (newName !== null && newName !== name) {
            // TODO: check if the name dont have any weird characters
            player.setName(newName); // Update the player name
            changeFlag = true;
        }

        if (newTeam !== null && newTeam !== player.getTeam()) {
            player.setTeam(newTeam); // Update the player team
            changeFlag = true;
        }

        if (newRole !== null && newRole !== player.getRole()) {
            player.setRole(newRole); // Update the player role
            changeFlag = true;
        }

        if (newIgn !== null && newIgn !== player.getIGN()) {
            player.setIGN(newIgn); // Update the player ign
            changeFlag = true;
        }

        // console.log(player.toString()); // works!!

        if (!changeFlag) {
            interaction.reply({content: 'No changes were made', ephemeral: true});
            return;
        }

        // Update player
        db.updatePlayer(player, name);
        
        // Update the players file
        const players = require('../../misc/players.js');

        players.forEach((p, index) => {
            if (p.name === name) {
                players[index] = player;
            }
        });

        const fs = require('fs');
        fs.writeFileSync('./src/misc/players.js', `module.exports = ${JSON.stringify(players)}`);

        // Reply to the user
        interaction.reply({ content: 'Player updated.', ephemeral: true});
    }
}