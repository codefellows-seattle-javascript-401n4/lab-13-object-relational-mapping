'use strict';

const request = require('superagent');
const Player = require('../models/players');
const mongoose = require('mongoose');

process.env.DB_URL = 'mongodb://localhost:27017/players_test';
const server = require('../lib/server');
server.start(5000);

beforeAll(() => {
  return Player.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  server.stop();
});

test('it should create a player', () => {
  return request
    .post('localhost:5000/players')
    .send({name: 'test'})
    .then((res) => {
      expect(res.body.name).toBe('test');
    });
});

test('it should get an array of players', () => {
  return request
    .get('localhost:5000/players')
    .then(res => {
      expect(Array.isArray(res.body)).toBe(true);
    });
});

test('it should get a single player', () => {
  (new Player({name: 'kyle'})).save()
    .then((player) => {
      return request
        .get('localhost:5000/player/' + player._id)
        .then(res => {
          expect(res.body.name).toBe('kyle');
        });
    });
});

test('it should update with a put', () => {
  return (new Player({name: 'testingaput'})).save()
    .then(player => {
      return request
        .put('localhost:5000/player/' + player._id)
        .send({name: 'newname'})
        .then(res => {
          expect(res.text).toBe('success!');
        });
    });
});

test('it should be able to murder a player', () => {
  return (new Player({name: 'abouttobemurdered'})).save()
    .then(player => {
      return request
        .delete('localhost:5000/player/' + player._id)
        .then(res => {
          expect(res.text).toBe('Deleted The Player.');
        });
    });
});
