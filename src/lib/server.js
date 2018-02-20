'use strict';
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const noteRoutes = require('../lib/routes/notes');
const notebookRoutes = require ('../lib/routes/notebooks');

mongoose.connect(process.env.MONGODB_URI);
const app = module.exports = require('express')();

app.use(noteRoutes);
app.use(notebookRoutes);

app.all('*', (req, res, next) => {
     next({statusCode:404, message:'route not found'});
    })

app.use((err, req, res, next ) => {
    console.log(err);
    res.status(err.statusCode||500).send(err.message||'server error')
})

app.listen(PORT, console.log(`server on ${PORT}`));