'use strict';

const expect = require('expect');
const app = require('../server.js')
const request = require('superagent');
const Wizard = require('../models/wizards.js');
const server = app.listen(5000);

require("dotenv").config();

describe('Mongoose Testing', () => {
    before(done => {
        Wizard.remove({});
        done();
    });

    after((done) => {
        server.close();
        done();
    });


    it('Should get a complete list of wizards', (done) => {
        request.get('localhost:5000/v1/wizards').then(res => {
            expect(res.text).toEqual('We got all the wizards correctly');
            done();
        })
    });

    it('Should get a specific wizard that we created', done => {
        const newWizard = new Wizard({name: 'Ronald'});
        newWizard.save().then(message => {
            request.get(`localhost:5000/v1/wizards/${message._id}`).then((res) => {
                expect(res.body._id).toEqual(`${message._id}`);
                done();
            });
        });
    });

    it('Should put a new wizard into the databse and give us a happy message', done => {
        request.post('localhost:5000/v1/wizards', {name: "Harry"}, (res) => {
            expect(res.response.text).toEqual('Wizard saved to database.');
            done();
        });
    });

    it('Should update a Harry to Arry', done => {
        const newWizard = new Wizard({name: 'Malfoy'});
        newWizard.save().then(message => {
            request.put(`localhost:5000/v1/wizards/${message._id}`).send({name: 'Arry'}).end((err, res) => {
                expect(res.body.name).toEqual('Malfoy');
                done();
            });
        });
    });

    it('Should delete Larry from the db', done => {
        const newWizard = new Wizard({name: 'Larry'});
        newWizard.save().then(message => {
            request.delete(`localhost:5000/v1/wizards/${message._id}`).end((err, res) => {
                expect(res.text).toEqual('Wizard Deleted!');
                done();
            });
        });
    });

    it('Should patch a new name instead of Larry', done => {
        const newWizard = new Wizard({name: 'Larry'});
        newWizard.save().then(message => {
            request.patch(`localhost:5000/v1/wizards/${message._id}`).send({name: 'Not Larry Anymore'}).end((err, res) => {
                expect(res.text).toEqual('Patched!');
                done();
            });
        });
    });
});