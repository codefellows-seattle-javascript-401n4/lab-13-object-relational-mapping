'use strict';
require("dotenv").config();

require(__dirname + '/server').listen(process.env.PORT || 3000);
