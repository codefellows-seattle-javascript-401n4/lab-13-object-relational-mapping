'use strict';

const mongoose = require('mongoose');

const wizardSchema = new mongoose.Schema({
    name: {type: String, required: true}
});

const Wizard = module.exports = mongoose.model('Wizard', wizardSchema);