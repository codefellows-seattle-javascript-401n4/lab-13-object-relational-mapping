'use strict';

module.exports = (err, req, res, next) => {
  console.log('Error :', err);
  if(err.statusCode){
    return res.sendStatus(err.statusCode);
  } else {
    return res.sendStatus(500);
  }
};
