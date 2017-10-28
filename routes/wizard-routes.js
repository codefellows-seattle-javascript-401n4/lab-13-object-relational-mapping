const express = require('express');
const jsonParser = require('body-parser').json();
const Wizard = require(`${__dirname}/../models/wizards.js`);
const sendMessage = require('../sendMessage.js');

const wizardRouter = module.exports = express.Router();

wizardRouter.post('/wizards', jsonParser ,(req, res, next) => {
    const newWizard = new Wizard(req.body);
    newWizard.save().then(message => sendMessage(res, 200, 'Wizard saved to database.'))
    .catch(err => next({error: err}));
});

wizardRouter.get('/wizards/:id', (req, res, next) => {
    Wizard.findOne({_id: req.params.id})
    .then(wizard => res.send(wizard))
    .catch(err => next({error: err}));
});

wizardRouter.get('/wizards', (req, res) => {
    Wizard.find(req.query || {})
        .then(wizards => res.send('We got all the wizards correctly'))
        .catch(err => res.send('Nope'));
});

wizardRouter.put('/wizards/:id',jsonParser,  (req, res, next) => {
    if (typeof req.body['_id'] !== 'undefined') delete req.body._id;
    Wizard.findOneAndUpdate({_id: req.params.id}, req.body)
      .then(data => res.send('success!'))
      .catch(err => next({error: err}));
});

wizardRouter.patch('/wizards/:id', jsonParser ,(req, res, next) => {
    if (typeof req.body._id !== 'undefined') delete req.body._id;
    Wizard.findOneAndUpdate({_id: req.params.id}, {$set: req.body}).then(data => res.send('Patched!')).catch(err => next({error: err}));
});

wizardRouter.delete('/wizards/:id', (req, res, next) => {
    Wizard.remove({_id: req.params.id}).then(res.send('Wizard Deleted!')).catch(err => next({error: err}));
});