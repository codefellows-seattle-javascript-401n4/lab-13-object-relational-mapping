'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/pokemon', {useMongoClient: true});

const app  = module.exports = require('express')();

app.use('/api/v1', require(__dirname + '/../routes/pokeRouter.js'));

app.use((err, req, res, next) => {
  console.log(err.error);
  res.status(err.statusCode || 500).send(err.message || ' :D server error :D');
});
