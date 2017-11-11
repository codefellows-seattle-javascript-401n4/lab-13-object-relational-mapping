'use strict';

const express = require('express');
const bodyParser = require('body-parser').json();
const Hours = require('../models/happyHour.js');
const Sushi = require('../models/sushi.js');
const happyHourRouter = module.exports = express.Router();

happyHourRouter.post('/hours', bodyParser, (req,res,next) => {
  new Hours(req.body).save()
  .then( data => res.send(data))
  .catch(err => next(err));
});

happyHourRouter.get('/hours', (req,res,next) => {
  let findObj = req.query || {};
  Hours.find(findObj)
  .then( data => res.send({statusCode:200, message: data}))
  .catch(err => next(err));
});

happyHourRouter.get('/hours/:id', (req,res,next) => {
  Hours.findOne({name: /hamachi/})
  .populate('Sushi_id')
  .exec(function(err,hours){
    if(err) return new Error('err');
  })
  .then( sushi => res.send(sushi))
  .catch(err => next(err));
});

happyHourRouter.put('/hours/:id', bodyParser, (req,res,next) => {
  delete req.body._id;
  Hours.findOneAndUpdate({Sushi_id: req.params.Sushi_id}, req.body)
  .then( data => res.send('sucess'))
  .catch(err => next({statusCode: 404, error:err}));
});

happyHourRouter.delete('/hours/:id', (req,res,next) => {
  Hours.remove({_id: req.params.Sushi_id})
  .then( data => res.send({statusCode: 200, message: 'sushi high am i right the sushi is all gone'}))
  .catch(err => next({statusCode: 400, error:err}));
});
