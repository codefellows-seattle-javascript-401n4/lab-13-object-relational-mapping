//mongo schema
'use strict';

const mongoose = require('mongoose');

const fileMetaDataSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now()},
  username : {type: String, default: 'user.name'},
  group:  {type: String, default: 'user.group'},
  path : {type: String, required: true, unique:true},
  description : {type: String, required: true, unique:true},
});

module.exports = mongoose.model('fileMetaData', fileMetaDataSchema); // collection, Schema, creates constructor function
