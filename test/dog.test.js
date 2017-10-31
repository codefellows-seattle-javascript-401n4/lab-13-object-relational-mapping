'use strict';

const request = require('superagent');
const Dog = require('../models/dog');
const mongoose = require('mongoose');

process.env.DB_URL = 'mongodb://localhost:27017/dogs_dev';
const server = require('../server');
server.listen(5000);

beforeAll(() => {
  return Dog.remove({});
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});

test('it should create a dog', () => {
  return request
    .post('localhost:5000/api/v1/dogs')
    .send({name: 'test'})
    .then((res) => {
      res = res.body;
      expect(res.name).toBe('test');
      expect(res.favoriteFood).toBe('Mighty Bone');
      expect(res.timeStamp).not.toBe(undefined);
      expect(res._id).not.toBe(undefined);
    });
});

test('it should get an array of dogs', () => {
  return request
    .get('localhost:5000/api/v1/dogs')
    .then(res => {
      expect(Array.isArray(res.body)).toBe(true);
    });
});

test('it should get a single dog', () => {
  (new Dog({name: 'testsingleget'})).save()
    .then((dog) => {
      return request
        .get('localhost:5000/api/v1/dogs/' + dog._id)
        .then(res => {
          expect(res.body.name).toBe('testsingleget');
        });
    })
});

test('it should update with a put', () => {
  return (new Dog({name: 'testingaput'})).save()
    .then(dog => {
      return request
        .put('localhost:5000/api/v1/dogs/' + dog._id)
        .send({name: 'newname'})
        .then(res => {
          expect(res.text).toBe('success!');
        });
    });
});

test('it should update with a patch', () => {
  return (new Dog({name: 'testingapatch'})).save()
    .then(dog => {
      return request
        .put('localhost:5000/api/v1/dogs/' + dog._id)
        .send({name: 'patchnewname'})
        .then(res => {
          expect(res.text).toBe('success!');
        })
    })
});

test('it should be able to murder a dog', () => {
  return (new Dog({name: 'abouttobemurdered'})).save()
    .then(dog => {
      return request
        .delete('localhost:5000/api/v1/dogs/' + dog._id)
        .then(res => {
          expect(res.text).toBe('dog successfully murdered');
        });
    })
});