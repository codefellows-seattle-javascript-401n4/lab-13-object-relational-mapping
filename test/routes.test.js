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
});