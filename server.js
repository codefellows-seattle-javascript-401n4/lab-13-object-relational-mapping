'use strict';

// require('dotenv').config();
// require('./lib/_server').start(process.env.PORT);

require(__dirname + '/./lib/_server').listen(process.env.PORT || 3000);
