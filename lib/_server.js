'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const morgan = require('morgan');
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/dogs_dev', {useMongoClient: true});

const app = module.exports = require('express')();

app.use('/api/v1', require(__dirname + '/../routes/dog-routes'));

app.use('/api/v1', require(__dirname + '/../routes/breed-routes'));

app.use(morgan('dev'));

app.use(require('./error-message'));

app.use((err, req, res, next) => {
//   console.log(err.error);
  res.status(err.statusCode || 500).send(err.message || 'server error');
  next();
});

module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};

// const server = module.exports = {};
// server.isRunning = false;
// server.start = () => {
//   return new Promise((resolve, reject) => {
//     if(!server.isRunning){
//       server.http = app.listen(process.env.PORT, () => {
//         server.isRunning = true;
//         console.log('server up', process.env.PORT);
//         resolve();
//       });
//       return;
//     }
//     reject(new Error('server is already running'));
//   });
// };

// server.stop = () => {
//   return new Promise((resolve, reject) => {
//     if(server.http && server.isOn){
//       return server.http.close(() => {
//         server.isRunning = false;
//         console.log('server down');
//         resolve();
//       });
//     }
//     reject(new Error('ther server is not running'));
//   });
// };
