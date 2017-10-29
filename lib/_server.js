'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/costumes_stg', {useMongoClient: true});

const app = module.exports = require('express')();

app.use('/api/1.0', require(__dirname + '/../routes/costume-routes'));

app.use((err, req, res, next) => {
  console.log(err.error);
  res.status(err.statusCode || 500).send(err.message || 'server error');
});


module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};
