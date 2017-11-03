'use strict';


const express = require('express');
const bodyParser = require('body-parser').json();
const Sushi = require('../models/sushi.js');

const sushiRouter = module.exports = express.Router();


sushiRouter.get('/sushis', (req,res,next) => {
  let findObj = req.query || {};
  Sushi.find(findObj)
  .then( sushi => res.send(sushi))
  .catch(err => next({error:err}));
});

sushiRouter.get('/sushis/:id', (req,res,next) => {
  Sushi.findOne({_id: req.params.id})
  .then( sushi => res.send(sushi))
  .catch(err => next({error:err}));
});

sushiRouter.post('/sushis', bodyParser, (req,res,next) => {
  let newNewSushi = new Sushi(req.body);
  newNewSushi.save()
  .then( data => res.send(data))
  .catch(err => next({statusCode: 500, message: 'error creating sushi', error:err}));
});

sushiRouter.put('/sushis', bodyParser, (req,res,next) => {
  delete req.body._id;
});
