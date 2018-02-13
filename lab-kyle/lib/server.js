'use strict';

require('dotenv').config();

const express = require('express');
let app = express();

const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let http = null;
let isRunning = false;

app.use(morgan('dev'));

app.use(require('../routes/teams'));
app.use(require('../routes/players'));

app.use('*', (req, res, next) => {
  res.sendStatus(404);
  next();
});

app.use(require('./middleware/error'));

module.exports = {
  start: (port) => {
    let usePort = port || process.env.PORT;
    if(isRunning) {
      throw Error('Server is already running.');
    }
    http = app.listen(usePort, () => {
      isRunning = true;
      console.log('Server running on Port: ', usePort);
    });
  },
  stop: () => {
    if(!isRunning){
      throw Error('Server is already off.');
    }
    if(!http){
      throw Error('Invalid Server');
    }
    http.close(() => {
      http = null;
      isRunning = false;
      console.log('App Closed.');
    });
  },
};
