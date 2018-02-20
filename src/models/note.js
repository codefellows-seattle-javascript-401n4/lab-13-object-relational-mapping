'use strict';

const mongoose= (require('mongoose'));

const noteSchema = new mongoose.Schema({
  name: {type: String, required: true},
  createDate: {type: Date, default: Date.now()},
  notebook:{type:String, required: false}
})

module.exports = mongoose.model('Note', noteSchema);