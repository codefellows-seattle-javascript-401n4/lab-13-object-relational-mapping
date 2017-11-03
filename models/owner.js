const mongoose = require('mongoose');
const Cat = require('./cat.js');
const ownerSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  // job: {type: String, required: true},
  cat: {type: mongoose.Schema.Types.ObjectId, ref: 'cats'},
  birthday: {type: Date, default: Date.now},
});

ownerSchema.pre('save', function(done){

  Cat.findById(this.cats)
  .then( cats => {
    if (! cats) {
      let newCat = new Cat({});
      return newCat.save();
    }
    else { return cats; }
  })
  .then( cats => this.cats = cats._id )
  .then( () => done() )
  .catch(done);

});

ownerSchema.pre('findOne', function(){
  this.populate({
    path:'cats',
  });
});

module.exports = mongoose.model('Owner', ownerSchema);
