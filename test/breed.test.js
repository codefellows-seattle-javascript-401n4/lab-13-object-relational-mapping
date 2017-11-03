'use strict';

const request = require('superagent');
const Breed = require('../models/breed');
const mongoose = require('mongoose');

process.env.DB_URL = 'mongodb://localhost:27017/breeds_dev';
process.env.PORT = 5000;

beforeAll(() => {
  require('../lib/_server').start(process.env.PORT);
  return Breed.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  require('../lib/_server').stop;
});

test('it should create a breed', () => {
  return request
    .post('localhost:5000/api/v1/breeds')
    .send({name: 'test'})
    .then((res) => {
      res = res.body;
      expect(res.name).toBe('test');
      //expect(res.timeStamp).not.toBe(undefined);
      expect(res._id).not.toBe(undefined);
    });
});

test('it should get an array of breeds', () => {
  return request
    .get('localhost:5000/api/v1/breeds')
    .then(res => {
      expect(Array.isArray(res.body)).toBe(true);
    });
});

test('it should get a single dog', () => {
  (new Breed({name: 'testsingleget'})).save()
    .then((breed) => {
      return request
        .get('localhost:5000/api/v1/dogs/' + breed._id)
        .then(res => {
          expect(res.body.name).toBe('testsingleget');
        });
    });
});

test('it should update with a put', () => {
  return (new Breed({name: 'testingaput'})).save()
    .then(breed => {
      return request
        .put('localhost:5000/api/v1/breeds/' + breed._id)
        .send({name: 'newname'})
        .then(res => {
          expect(res.text).toBe('success!');
        });
    });
});

test('it should update with a patch', () => {
  return (new Breed({name: 'testingapatch'})).save()
    .then(breed => {
      return request
        .put('localhost:5000/api/v1/breeds/' + breed._id)
        .send({name: 'patchnewname'})
        .then(res => {
          expect(res.text).toBe('success!');
        })
    })
});

test('it should be able to murder a dog', () => {
  return (new Breed({name: 'abouttobemurdered'})).save()
    .then(breed => {
      return request
        .delete('localhost:5000/api/v1/breeds/' + breed._id)
        .then(res => {
          expect(res.text).toBe('dog successfully murdered');
        });
    })
});