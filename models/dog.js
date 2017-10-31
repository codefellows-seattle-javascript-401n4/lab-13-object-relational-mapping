'use strict';

const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  favoriteFood: {type: String, default: 'Mighty Bone'},
  timeStamp: {type: Date, default: Date.now}
});

const Dog = module.exports = mongoose.model('Dog', dogSchema);