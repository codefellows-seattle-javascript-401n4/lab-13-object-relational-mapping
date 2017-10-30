'use strict';
const PORT = process.env.PORT || 4000;
const DB = process.env.DB_URL || 'mongodb://localhost:27017/visual_files_dev';

const mongoose = require('./lib/mongooseDB');
mongoose.connect(DB, {useMongoClient: true});

require(__dirname + '/lib/server.js').listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});
