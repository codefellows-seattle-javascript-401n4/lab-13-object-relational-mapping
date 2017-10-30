/*globals beforeAll, afterAll, expect*/
'use strict';

const request = require('superagent');
const mongoose = require('../lib/mongooseDB');
const server = require('../lib/server');
const FileData = require('../fileData/model');

process.env.DB_URL = 'mongodb://localhost:27017/visual_files_test';
process.env.PORT = 8000;

const PORT =  process.env.PORT;
const url = `localhost:${PORT}/api/v1/visual_files`;



describe('visual_files API', () => {
  beforeAll(() => {
    const DB = process.env.DB_URL;
    mongoose.connect(DB, {useMongoClient: true});
    server.listen(PORT);
    return FileData.remove({});
  });
  afterAll((done) => {
    server.close();
    FileData.remove({});
    return mongoose.connection.close(function(){
      done();
    });
  });
  describe('POST', () => {
    test('it should create file metadata', () => {
      let testdata = new FileData({name:'name', description: 'description-get', path: 'path-get'});
      return request
        .post(url)
        .send(testdata)
        .then((res) => {
          expect(res.status).toEqual(200);
          res = res.body; //
          expect(res.name).toEqual('name');
          expect(res.description).toEqual('description-get');
          expect(res.path).toEqual('path-get');
        });
    });
    test('it responds with 400 if no body', () => {
      return request
        .post(url)
        .send()
        .catch(err => {
          expect(err.status).toEqual(400);
          expect(err.response.error.text).toEqual('errors: need a path, need a description, need a name');
        });
    });
  });

  describe('GET', () => {
    test('it should get an array of meta data about files', () => {
      return request
        .get(url)
        .then(res => {
          expect(res.status).toBe(200);
          res = res.body;
          expect(Array.isArray(res));
        });
    });

    test('it should get a single meetadata object given a valid id', () => {
      let testdata = new FileData({name:'get-name', description: 'description-to-get', path: 'test-path'});
      (new FileData(testdata)).save()
        .then((filedata) => {
          return request
            .get(`${url}/${filedata._id}`)
            .then(res => {
              expect(res.status).toBe(200);
              res = res.body;
              expect(res.name).toBe('get-name');
              expect(res.description).toEqual('description-to-get');
              expect(res.path).toEqual('test-path');
            });
        });
    });
    test('it should respond with 404 if not an existing id', () => {
      return request
        .get(`${url}/test-id`)
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err.response.error.text).toEqual('cant find what you are looking for');
        });
    });
  });

  describe('PUT', () => {
    test('it should update with a put', () => {
      let testdata = new FileData({name:'put-name', description: 'description-put', path: 'path-put'});
      let changeddata = new FileData({name:'new-put-name', description: 'description-put-new', path: 'test-path-new'});
      (new FileData(testdata)).save()
        .then((file) => {
          return request
            .put(`${url}/${file._id}`)
            .send(changeddata)
            .then(res => {
              res = res.body;
              expect(res.text).toBe('success!');
            });
        });
    });

    test('it should respond with 404 if not found', () => {
      let changeddata = new FileData({name:'new-put-name', description: 'description-put-new', path: 'test-path-new'});
      return request
        .put(`${url}/id`)
        .send(changeddata)
        .catch(err => {
          expect(err.status).toEqual(404);
          expect(err.response.error.text).toEqual('id does not exist');
        });
    });

    test('it should respond with 400 if no body', () => {
      return request
        .put(`${url}/id`)
        .send()
        .catch(err => {
          expect(err.status).toEqual(400);
          expect(err.response.error.text).toEqual('errors: need a path, need a description, need a name');
        });
    });
  });

});
