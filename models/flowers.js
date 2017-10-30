'use strict';

const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  name: {type: string, required: true, unique: true},
  color: {type: string},
  orderedDate: {type: Date, default: Date.now}
});

const Flower = moduel.exports = mongoose.model('Flower', flowerSchema);
