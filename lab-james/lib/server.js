'use strict';

const Note = require('./Note.js');
const express = require('express');
const promAll = require('bluebird').promisifyAll;
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
const jsonParser = require('body-parser').json();

const app = express();

app.post('/api/notes', jsonParser, (req, res) => {
  if(!req.body.name){
    return res.status(400).send('Missing name');
  }

  if(!req.body.content){
    return res.status(400).send('Missing content');
  }

  let note = new Note(req.body);

  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.insertAsync(note)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch( () => {
        res.status(500).send('server error');
      });
    return db;
  });
});

app.get('/api/notes', (req, res) => {

  try {
    let id = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
    connection.then(db => {
      const col = promAll(db.collection('notes'));
      col.findAsync(id)
        .then(cur => {
          promAll(cur).toArrayAsync()
          .then(data => res.status(200).send(data))
          .catch( () => {
            res.status(500).send('server error');
          });
        })
        .catch( () => {
          res.status(500).send('server error');
        });
      return db;
    });
  }

  catch(err) {
    res.status(400).send('ID not found');
  }

});

app.delete('/api/notes', (req, res) => {
  let id = req.query.id ? {_id: mongodb.ObjectID(req.query.id)} : false;

  if(id){
    connection.then(db => {
      const col = promAll(db.collection('notes'));
      col.removeAsync(id)
        .then( () => {
          res.status(204).send('Note delelted');
        })
        .catch( () => {
          res.status(500).send('server error');
        });
      return db;
    });
  } else {
    return res.status(400).send('ID required');
  }

});

let isRunning = false;

module.exports = {
  start: () => {
    return new Promise( (resolve, reject) => {
      if(!isRunning){

        app.listen(3000, err => {
          if(err){
            reject(err);
          } else {
            isRunning = true;
            resolve(console.log('Server up'));
          }
        });

      } else {

        reject(console.log('Server is already running'));

      }
    });
  },
  stop: () => {
    return new Promise( (resolve, reject) =>{
      if(!isRunning){

        reject(console.log('Server is not up'));

      } else {

        app.close(err => {
          if(err){
            reject(err);
          } else {
            isRunning = false;
            resolve(console.log('Server off'));
          }
        });

      }
    });
  },
};
