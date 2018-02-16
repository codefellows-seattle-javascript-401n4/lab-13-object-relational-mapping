'use strict';
const PORT = 5000;
require('dotenv').config();
const  mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const express = require('express') ;
const  expect = require ('expect');
const  superagent = require ('superagent');
const  Note = require('../models/note');
const  noteRouter = require('../lib/routes')
const server = require('express')();

server.use(noteRouter);

server.use((err, req, res, next ) => {
    res.status(err.statusCode||500).send(err.message||'server error')
})

beforeAll(()=>{
    server.listen(PORT);
})

afterAll(()=>{
    server.close();
})

describe('Note router:', ()=>{
    let idForGet;
    it('should respond with a 404 for unregistered paths ',()=>{
        return superagent
        .post(`localhost:${PORT}/api/oo`)
        .set({"Content-Type":"application/json"})
        .send({"name":"test"})
        .then(Promise.reject)
        .catch(res=>{
            expect(res.status).toEqual(404);
            expect(res.message).toBe('Not Found')
        })
    })
    it('POST should respond with the body content for a post request with a valid body',()=>{
        mongoose.connect('mongodb://maslovai:Anna2009@ds239648.mlab.com:39648/labs');
        return superagent 
        .post(`http://localhost:${PORT}/api/note`)
        // .set({"Content-Type":"application/json"})
        .send({name:"test note"})
        .then((res) => {
            console.log('in post, res::::::::::::: ' , res.body)
            expect(res.body.name).toBe('test note');
            idForGet = res.body._id;
        })
        .catch(err=> console.log(err.message))
        // .catch(err => console.log(err))
    })
    it('GET tasks should return a note', ()=>{
        return superagent
        .get(`http://localhost:${PORT}/api/note/${idForGet}`)
        .then(res => {
            // console.log('in get ::::', res.body)
            expect(res.body._id).toEqual(idForGet)
        })
        .catch(err =>console.log(err))
    })

    it ('PUT should update a record in db', ()=>{  
        return superagent
        .put(`http://localhost:${PORT}/api/note/${idForGet}`)
        .set({"Content-Type":"application/json"})
        .send({"name":"edited name"})
        .then(res => {
            // console.log('in edit :', res.body)
           expect(res.body.name).toEqual("edited name");
           expect(res.body._id).toEqual(idForGet)
        })
        .catch(err=>console.log(err))
    })   

    it ('PUT should respond with a 404 if note is not found', ()=>{  
        return superagent
        .put(`http://localhost:${PORT}/api/note/4a87521a1a58393e927ed239`)
        .set({"Content-Type":"application/json"})
        .send({"name":"edited name"})
        .then(Promise.reject)
        .catch(res=>{
          expect(res.status).toEqual(404);
          expect(res.message).toBe('Not Found')
        })
    })   
    
    it ('DELETE  should delete a record in db', ()=>{ 
        return superagent
        .delete(`http://localhost:${PORT}/api/note/${idForGet}`)
        .then(res=>{
            // console.log("in delete", res.text)
            expect (res.text).toEqual("Success!")
            mongoose.disconnect();
        })
        .catch(()=>{
            mongoose.disconnect();
        }) 
    })
    mongoose.disconnect();
})