let players = {Top: [null, null], Jungle: [null, null], Mid: [null, null], ADC: [null, null], Support: [null, null]};

/**
 * Function to check if there are 2 players of each role in the queue
 * @returns {Boolean} true if there are 2 players of each role in the queue
 */
function checkQueue() {
    // get the queue
    const queue = require('../misc/queue.js');
    
    // Go through the queue and check if there are 2 players of each role
    queue.forEach((p) => {
        // assign the player to the first empty slot
        if (players[p.role][0] == null) players[p.role][0] = p;
        else players[p.role][1] = p;
    })

    // if there are 2 players of each role, return true
    return players.Top[0] != null && players.Top[1] != null && players.Jungle[0] != null && players.Jungle[1] != null && players.Mid[0] != null && players.Mid[1] != null && players.ADC[0] != null && players.ADC[1] != null && players.Support[0] != null && players.Support[1] != null;
}

/**
 * Function to generate a game
 */
function generateGame() {
    // Get the queue
    let queue = require('../misc/queue.js');
    // Remove the players from the queue
    let updatedQueue = queue.filter(player => { // filter out the players that are in the game
        let roleArray = Object.values(players).flat();
        return !roleArray.includes(player);
    });
    
    queue = updatedQueue;

    // players is an {Top: [null, null], Jungle: [null, null], Mid: [null, null], ADC: [null, null], Support: [null, null]} object

    // TODO: Might have to look into this again, queue might not be sorted correctly
    // Write the updated queue to the file
    const fs = require('fs');
    fs.writeFileSync('./src/misc/queue.js', `module.exports = ${JSON.stringify(queue)}`);

    // TODO: Generate a game here
    // - Have a list of all games being played
}


module.exports = { checkQueue, generateGame };