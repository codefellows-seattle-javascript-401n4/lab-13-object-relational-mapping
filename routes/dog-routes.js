'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Dog = require(__dirname + '/../models/dog');

const dogRouter = module.exports = express.Router();

dogRouter.get('/dogs', (req, res, next) => {
  let findObj = req.query || {};
  Dog.find(findObj)
    .then(bears => res.send(bears))
    .catch(err => next({error: err}));
});

dogRouter.get('/dogs/:id', (req, res, next) => {
  Dog.findOne({_id: req.params.id})
    .then(bears => res.send(bears))
    .catch(err => next({error: err}));
});

dogRouter.post('/dogs', jsonParser, (req, res, next) => {
  let newDog = new Dog(req.body);
  newDog.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 500, message: 'error creating bear', error: err}))
});

dogRouter.put('/dogs/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Dog.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(data => res.send('success!'))
    .catch(err => next({error: error}));
});

dogRouter.patch('/dogs/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  //$set will only update the supplied fields
  //instead of replacing the entire object
  Dog.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(data => res.send('success!'))
    .catch(err => next({error: err}))
});

dogRouter.delete('/dogs/:id', (req, res, next) => {
  Dog.remove({_id: req.params.id})
    .then(data => res.send('dog successfully murdered'))
    .catch(err => next({error: err}));
});
