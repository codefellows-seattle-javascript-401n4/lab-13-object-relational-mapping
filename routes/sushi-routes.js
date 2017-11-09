'use strict';


const express = require('express');
const bodyParser = require('body-parser').json();
const Sushi = require('../models/sushi.js');

const sushiRouter = module.exports = express.Router();


sushiRouter.get('/sushi', (req,res,next) => {
  let findObj = req.query || {};
  Sushi.find(findObj)
  .then( sushi => res.send({statusCode:200, message: sushi}))
  .catch(err => next({error:err}));
});

sushiRouter.get('/sushi/:id', (req,res,next) => {
  Sushi.findOne({_id: req.params.id})
  .then( sushi => res.send(sushi))
  .catch(err => next({statusCode: 404}));
});

sushiRouter.post('/sushi', bodyParser, (req,res,next) => {
  let newNewSushi = new Sushi(req.body);
  newNewSushi.save()
  .then( data => res.send(data))
  .catch(err => next({statusCode: 400, message: 'error creating sushi', error:err}));
});

sushiRouter.put('/sushi/:id', bodyParser, (req,res,next) => {
  delete req.body._id;
  Sushi.findOneAndUpdate({_id: req.params.id}, req.body)
  .then( data => res.send('sucess'))
  .catch(err => next({statusCode: 404, error:err}));
});

sushiRouter.delete('/sushi/:id', (req,res,next) => {
  Sushi.remove({_id: req.params.id})
  .then( data => res.send({statusCode: 200, message: 'sushi high am i right the sushi is all gone'}))
  .catch(err => next({statusCode: 400, error:err}));
});
