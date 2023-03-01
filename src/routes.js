const express = require('express');
const router = express.Router();
const { getPlayers, getGames, addPlayer } = require('./objects/Data');
const Player = require('./objects/Player');

router.get('/players', (req, res) => {
    res.json(getPlayers());
});

router.get('/games', (req, res) => {
    res.json(getGames());
});

router.post('/players', (req, res) => {
    const { name, team, role, ign, wins, losses, games } = req.body;
    const player = new Player(name, team, role, ign, wins, losses, games);

    let response;
    if (addPlayer(player)) {
        response = {
            status: 'success',
            message: 'Player added successfully',
            data: player
        }
        
        // refetch the players from the database
        // router.get('/players', (req, res) => {
        //     res.json(getPlayers());
        // });
    } else {
        response = {
            status: 'error',
            message: 'Player already exists',
        }
    }
    res.json(response);
});

module.exports = router;
