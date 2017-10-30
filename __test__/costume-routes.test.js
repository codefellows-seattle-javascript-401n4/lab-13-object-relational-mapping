'use strict';

const request = require('superagent');
const Costume = require('../models/costume');
const mongoose = require('mongoose');
const expect = require('expect');

process.env.DB_URL = 'mongodb://localhost:27017/costumes_stg';
process.env.PORT = 4000;
// const server = require('../lib/_server');
// server.listen(4000);

beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return Costume.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});

let costumeID = '';

describe('POST /api/1.0/costumes', () => {

  test('it should create a new costume', () => {
    return request
      .post('localhost:4000/api/1.0/costumes')
      .send({name: 'Jack Skellington', profile: 'professional skeleton', parts: ['mask', 'suit', 'pants']})
      .then((res) => {
        costumeID = res.body._id;
        expect(res.body.name).toBe('Jack Skellington');
        expect(res.body.profile).toBe('professional skeleton');
        expect(res.body.parts).not.toBe(undefined);
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });

  test('it should create another new costume', () => {
    return request
      .post('localhost:4000/api/1.0/costumes')
      .send({
        'name': 'Michael Jackson',
        'parts': [
          'wig',
          'thriller jacket',
          'red pants',
          'fedora hat',
          'patent leather shoes',
          'aviator glasses',
          'white glove',
          'dance moves',
          'eyeliner',
        ],
        'profile': 'entertainer, world dominator',
      })
      .then((res) => {
        expect(res.body.name).toBe('Michael Jackson');
        expect(res.body.profile).toBe('entertainer, world dominator');
        expect(res.body.parts[0]).toBe('wig');
        expect(res.body._id).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });

  test('it should return a 400 if bad json is given', () => {
    return request
      .post('localhost:4000/api/1.0/costumes')
      .send('Hello World')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.message).toEqual('Bad Request');
      });
  });

});

describe('GET /api/1.0/costumes', () => {

  test('it should return all costumes if no id is given', () => {
    return request
      .get('localhost:4000/api/1.0/costumes')
      .then(res => {
        expect(res.body[0].name).toBe('Jack Skellington');
        expect(res.body[1].name).toBe('Michael Jackson');
        expect(res.status).toBe(200);
      });
  });

  test('it should get a single costume with id param', () => {
    return request
      .get(`localhost:4000/api/1.0/costumes/${costumeID}`)
      .then(res => {
        expect(res.body.name).toBe('Jack Skellington');
        expect(res.status).toBe(200);
      });
  });

  test('it should return a 404 for invalid id', () => {
    let badID = 12345;
    return request
      .get(`localhost:4000/api/1.0/costumes/${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('Not Found');
      });
  });

});

describe('PUT /api/1.0/costumes', () => {

  test('it should update with a put when valid ID is given', () => {
    return request
      .put(`localhost:4000/api/1.0/costumes/${costumeID}`)
      .send({name: 'Emma', profile: 'OG Avenger'})
      .then(res => {
        expect(res.text).toBe('Costume has been updated!');
        expect(res.status).toEqual(200);
      });
  });

  test('it should return a 400 when no body is provided', () => {
    return request
      .put(`localhost:4000/api/1.0/costumes/${costumeID}`)
      .send({})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(res.message).toEqual('Bad Request');
      });
  });

  test('it should return a 404 when no body is provided', () => {

    let badID = 12345;

    return request
      .put(`localhost:4000/api/1.0/costumes/${badID}`)
      .send({name: 'Joe Mama'})
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(res.message).toEqual('Not Found');
      });
  });

});

describe('PATCH /api/1.0/costumes', () => {

  test('it should update with a patch', () => {
    return request
      .patch(`localhost:4000/api/1.0/costumes/${costumeID}`)
      .send({name: 'Emma Peel'})
      .then(res => {
        expect(res.text).toBe('Costume has been updated!');
        expect(res.status).toEqual(200);
      });
  });
});


describe('PATCH /api/1.0/costumes', () => {

  test('it should be able to delete a costume', () => {
    return request
      .delete(`localhost:4000/api/1.0/costumes/${costumeID}`)
      .then(res => {
        expect(res.text).toEqual('Costume has been deleted');
      });
  });
});
