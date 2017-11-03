'use strict';

const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  color: {type: String, default: 'red'},
  orderedDate: {type: Date, default: Date.now}
});

const Flower = module.exports = mongoose.model('Flower', flowerSchema);
