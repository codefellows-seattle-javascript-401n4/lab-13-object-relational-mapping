'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Breed = require(__dirname + '/../models/breed');
const Dog = require(__dirname + '/../models/dog');

const breedRouter = module.exports = express.Router();

breedRouter.get('/breeds', (req, res, next) => {
  let findObj = req.query || {};
  Breed.find(findObj)
    .then(breeds => res.send(breeds))
    .catch(err => next({error: err}));
});

breedRouter.get('/breeds/:id', (req, res, next) => {
  Breed.findOne({_id: req.params.id})
    .then(breeds => res.send(breeds))
    .catch(err => next({error: err}));
});

breedRouter.post('/breeds', jsonParser, (req, res, next) => {
  let newBreed = new Breed(req.body);
  newBreed.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 500, message: 'error creating breed', error: err}));
});

breedRouter.put('/breeds/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  Breed.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => res.send('success!'))
    .catch(err => next({error: err}));
});

breedRouter.patch('/breeds/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  //$set will only update the supplied fields
  //instead of replacing the entire object
  Breed.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(() => res.send('success!'))
    .catch(err => next({error: err}));
});

breedRouter.delete('/breeds/:id', (req, res, next) => {
  Breed.remove({_id: req.params.id})
    .then(() => res.send('breed successfully murdered'))
    .catch(err => next({error: err}));
});