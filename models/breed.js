'use strict';

const mongoose = require('mongoose');
const Dog = require('./dog');

const breedSchema = mongoose.Schema({
  name: { type:String, require:true },
  dog: {type:mongoose.Schema.Types.ObjectId, ref:'dogs' }
});

breedSchema.pre('save', function(done) {

  Dog.findById(this.dog)
    .then(dog => {
      if (!dog) {
        let newDog = new Dog({});
        return newDog.save();
      } else { return dog; }
    })
    .then(dog => this.dog = dog._id)
    .then(() => done)
    .catch(done);
});

const Breed = module.exports = mongoose.model('Breed', breedSchema);
