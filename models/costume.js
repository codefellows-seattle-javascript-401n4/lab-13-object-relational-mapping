'use strict';

const mongoose = require('mongoose');

const costumeSchema = new mongoose.Schema({

  name: {type: String, required: true, unique: true},
  profile: String,
  parts: {type: Array},
  createDate: {type: Date, default: Date.now},

});

const Costume = module.exports = mongoose.model('Costume', costumeSchema);
