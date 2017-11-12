'use strict';

const mongoose = require('mongoose');
// const Sushi = require('../models/sushi.js');

const happyHourSchema = new mongoose.Schema({
  name: {type:String},
  price: {type: Number},
  Sushi_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Sushi'},
});



module.exports = mongoose.model('hours', happyHourSchema);
