const mongoose = require('mongoose');
const Cat = require(__dirname + '/../models/cat.js');
const ownerSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  // job: {type: String, required: true},
  cat: {type: mongoose.Schema.Types.ObjectId, ref: 'cats'},
  birthday: {type: Date, default: Date.now},

});
module.exports = mongoose.model('Owner', ownerSchema);
