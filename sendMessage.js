'use strict';

module.exports = (res, statusCode, message) => {
    res.writeHead(statusCode, {'Content-Type': 'text/plain'});
    res.write(message);
    res.end();
};