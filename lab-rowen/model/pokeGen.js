'use strict';

const mongoose = require('mongoose');

const pokeSchema = new mongoose.Schema({
  pokemon: {type: String, required: true},
  item: {type: String, default: 'none'},
  moveSet: {type: String, default: 'struggle'}
});

const Pokemon = module.exports = mongoose.model('Pokemon', pokeSchema);
