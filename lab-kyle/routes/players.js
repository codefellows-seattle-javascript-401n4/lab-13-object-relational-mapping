'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Player = require(__dirname + '/../models/players');

const playerRouter = module.exports = express.Router();

playerRouter.post('/players', jsonParser, (req, res, next) => {
  let newPlayer = new Player(req.body);
  newPlayer.save()
    .then((data) => res.send(data))
    .catch(err => next(err));
});

playerRouter.delete('/player/:id', jsonParser, (req, res, next) => {
  let playerId = req.params.id;
  Player.remove({_id:playerId})
    .then(() => res.send('Deleted The Player.'))
    .catch(next);
});

playerRouter.get('/players', (req, res, next) => {
  Player.find({})
    .then((players) => res.send(players))
    .catch(next);
});

playerRouter.get('/player/:id', (req, res, next) => {
  let playerId = req.params.id;
  Player.findOne({_id:playerId})
    .then((player) => res.send(player))
    .catch(next);
});

playerRouter.put('/player/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Player.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => res.send('success!'))
    .catch(err => next({error: err}));
});
