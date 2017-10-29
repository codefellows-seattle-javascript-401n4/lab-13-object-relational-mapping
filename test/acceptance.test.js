
const request = require('superagent');
const mongoose = require('../lib/mongooseDB');
const server = require('../lib/server');
const FileData = require('../fileData/model');

process.env.DB_URL = 'mongodb://localhost:27017/aics_files_test';
process.env.PORT = 8000;

const PORT =  process.env.PORT;
const url = `localhost:${PORT}/api/v1/aics_files`;

beforeAll(() => {
  const DB = process.env.DB_URL;
  mongoose.connect(DB, {useMongoClient: true});
  server.listen(PORT)
  return FileData.remove({})
})

afterAll(() => {
  server.close()
})

test('it should create file metadata', () => {
  let testdata = new FileData({name:"name", description: "description-get", path: "path-get"});
  return request
    .post(url)
    .send(testdata)
    .then((res) => {
      res = res.body //
      expect(res.name).toEqual('name');
      expect(res.description).toEqual('description-get');
      expect(res.path).toEqual('path-get');

    })
})

test('it should get an array of meta data about files', () => {
  return request
    .get(url)
    .then(res => {
      res = res.body //
      expect(Array.isArray(res));
    })
})

test('it should get a single meetadata object', () => {
  let testdata = new FileData({name:"get-name", description: "description-to-get", path: "test-path"});
  (new FileData(testdata)).save()
    .then((filedata) => {
      return request
        .get(`${url}/${filedata._id}`)
        .then(res => {
          expect(res.body.name).toBe('get-name');
          expect(res.description).toEqual('description-to-get');
          expect(res.path).toEqual('test-path');
        })
    })
})

test('it should update with a put', () => {
  let testdata = new FileData({name:"put-name", description: "description-put", path: "path"});
  let changeddata = new FileData({name:"put-name", description: "description-new", path: "test-path-new"});
  (new FileData(testdata)).save()
    .then((file) => {
      return request
        .put(`${url}/${file._id}`)
        .send(changeddata)
        .then(res => {
          res = res.body
          expect(res.text).toBe('success!')
        })
    })
})
