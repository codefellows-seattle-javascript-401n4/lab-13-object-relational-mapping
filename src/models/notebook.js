'use strict';

const mongoose= (require('mongoose'));

const notebookSchema = new mongoose.Schema({
  name: {type: String, required: true},
  createDate: {type: Date, default: Date.now()},
  notesIds:{type:Array, required: false}
})

module.exports = mongoose.model('Notebooks', notebookSchema);