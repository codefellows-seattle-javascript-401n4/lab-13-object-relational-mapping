'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const server = require(__dirname + '/lib/server.js');

server.listen(PORT, () => console.log(`server is up, kupo!: ${PORT}`));
