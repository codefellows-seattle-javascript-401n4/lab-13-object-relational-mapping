'use strict';

const mongoose = require('mongoose');

const sushiSchema = new mongoose.Schema({
  name:{type: String,required: true, unique:true},
  topping:{type: String, default: 'crab'},
  price:{type:Number, min:10},
});


const Sushi = module.exports = mongoose.model('Sushi', sushiSchema);
