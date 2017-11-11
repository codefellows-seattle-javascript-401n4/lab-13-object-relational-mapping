'use strict';

const mongoose = require('mongoose');
// const Sushi = require('../models/sushi.js');

const happyHourSchema = new mongoose.Schema({
  name: {type:String},
  price: {type: Number},
  Sushi_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Sushi'},
});

// happyHourSchema.pre('findOne', function(done){
//   this.populate({
//     path: 'Sushi',
//     populate: {
//       path: 'hours',
//     },
//   });
//   done();
// });
//
// happyHourSchema.pre('save', function(done){
//   Sushi.findById(this.sushi)
//   .then( sushi => {
//     if(!sushi){return Promise.reject()
//       .then(Promise.resolve())
//       .catch( err => Promise.reject(err));
//     }
//   })
//   .then( () => done())
//   .catch(done);
// });

module.exports = mongoose.model('hours', happyHourSchema);
