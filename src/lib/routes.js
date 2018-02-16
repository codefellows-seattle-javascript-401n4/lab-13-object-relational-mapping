'use strict';
const Note = require('../models/note');
const bodyParser = require('body-parser');
const noteRouter = module.exports = require('express').Router();

noteRouter.post('/api/note',  bodyParser.json(), (req, res, next) => {
    if(!req.body) next(400);
    let note= new Note({
    "name": req.body.name,
    })
    note.save();
    res.send(note)
  })

noteRouter.get('/api/note/:id', (req, res, next)=>{
    if(!req.params.id) next(400);

    Note.findOne({_id: req.params.id})
    .then( note => {
      if (!note) next({statusCode:404, message:"note not found"})
      res.send(note); 
    })
    .catch(next)
})

noteRouter.put('/api/note/:id', bodyParser.json(), (req, res, next) => {
    if(!req.body) next(400);
    let note = new Note({
      "name": req.body.name,
    })
    
    Note.findOne({_id:req.params.id})
    .then( note => {
       if (!note) next({statusCode:404, message:"note not found"})
       Object.assign(note, req.body);
       note.save();
       res.send(note)
    })  
    .catch(next)
}) 
noteRouter.delete('/api/note/:id',   (req, res, next) => {
    Note.remove({_id:req.params.id})
    .then(()=>res.send('success!'))
    .catch(next)
})