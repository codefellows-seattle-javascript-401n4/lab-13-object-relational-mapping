'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const sendMessage = require('./sendMessage.js');
require("dotenv").config();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/wizards_testing', {useMongoClient: true});

app.use('/v1', require('./routes/wizard-routes'));

app.use((err, req, res, next) => {

    if (err) sendMessage(res, err.statusCode || 404,err.error);
});

module.exports = app;