'use strict';
const Notebook = require('../../models/notebook');
const bodyParser = require('body-parser');
const notebookRouter = module.exports = require('express').Router();

notebookRouter.post('/api/notebook',  bodyParser.json(), (req, res, next) => {
    if(!req.body) next(400);
    console.log('in post notebook: req.body: ', req. body)
    let notebook= new Notebook({
    "name": req.body.name,
    "notesIds": req.body.noteID
    })
    notebook.save();
    res.send(notebook)
  })

notebookRouter.get('/api/notebook/:id', (req, res, next)=>{
    if(!req.params.id) next(400);

    Notebook.findOne({_id: req.params.id})
    .then( notebook => {
      if (!notebook) next({statusCode:404, message:"notebook not found"})
      res.send(notebook); 
    })
    .catch(next)
})

notebookRouter.put('/api/notebook/:id', bodyParser.json(), (req, res, next) => {
    if(!req.body) next(400);
    
    Notebook.findOne({_id:req.params.id})
    .then( notebook => {
       if (!notebook) next({statusCode:404, message:"notebook not found"})
    //    console.log('in put, req.body:', req.body)
       Object.assign(notebook, req.body, notebook.notesIds.push(req.body.notesIDs));
    //    console.log('in put, notebook:', notebook);
       notebook.save();
       res.send(notebook)
    })  
    .catch(next)
}) 
notebookRouter.delete('/api/notebook/:id',   (req, res, next) => {
    Notebook.remove({_id:req.params.id})
    .then(()=>res.send('success!'))
    .catch(next)
})