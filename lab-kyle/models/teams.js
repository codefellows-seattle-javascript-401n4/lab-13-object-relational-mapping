'use strict';

const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  name: {type:String, require:true},
});

module.exports = mongoose.model('teams', teamSchema);
