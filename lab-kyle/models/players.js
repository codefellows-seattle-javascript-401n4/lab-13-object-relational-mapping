'use strict';

const mongoose = require('mongoose');
const Team = require('./teams');

const playerSchema = mongoose.Schema({
  name: {type:String, required:true},
  position: {type:String, required:false},
  number: {type:Number, required:false},
  bats: {type:String, required:false},
  throws: {type:String, required:false},
  team: {type:mongoose.Schema.Types.ObjectId, ref:'teams'},
});

playerSchema.pre('findOne', function(done){
  this.populate({
    path: 'team',
    populate: {
      path: 'players',
    },
  });
  done();
});

playerSchema.pre('save', function(done){
  Team.findById(this.team)
    .then(team => {
      if(!team){
        return Promise.reject();
      } else {
        this.team = team._id;
        return Promise.resolve();
      }
    })
    .then(() => done())
    .catch(done);
});

module.exports = mongoose.model('players', playerSchema);
