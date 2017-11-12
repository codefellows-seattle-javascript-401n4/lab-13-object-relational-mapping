'use strict';


const expect = require('expect');
const superagent = require('superagent');
const mocha = require('mocha');
const server = require('../index.js');
process.env.MONGODB_URL || 'mongodb://localhost:27017/lab13';
const mongoose = require('mongoose');
const Sushi = require('../models/sushi.js');
const Food = require('../models/happyHour.js');


describe('get routes', () => {
  it('should return 200 for a request made with a valid body', () => {
    return superagent.get('http://localhost:3000/sushi')
    .then( res => {
      expect(res.status).toBe(200);
    });
  });
  it('should return a 200 for a request made with a valid body', () => {
    return superagent.get('http://localhost:3000/hours')
    .then( res => {
      expect(res.status).toBe(200);
    });
  });
  it('should return the data for a request made with a proper id', () => {
    return superagent.get('http://localhost:3000/hours/5a075729fafff0ad7a6c4f29')
    .then( res => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('hamachi');
      expect(res.body.Sushi_id).toBe(null);
    });
  });
  it('should return 404 for an id that was not found', () => {
    return superagent.get('http://localhost:3000/sushi/')
    .catch( res => {
      expect(res.status).toBe(404);
    });
  });
});

describe('put routes', () => {
  it('should return a 200 with an updated id', () => {
    return superagent.put('http://localhost:3000/sushi/5a03d2421376fca36eb832cb')
    .send({name: 'spider'})
    .then( res => {
      expect(res.text).toBe('sucess');
    });
  });
  it('should return a 200 with an updated id', () => {
    return superagent.put('http://localhost:3000/hours/5a075729fafff0ad7a6c4f29')
    .send({name: 'hamachi', price: 5})
    .then( res => {
      expect(res.text).toBe('sucess');
    });
  });
  it('should return 400 for a bad request with no body', () => {
    return superagent.put('http://localhost:3000/sushi/5a03d2421376fca36eb832cb')
    .send()
    .catch( res => {
      expect(res.status).toBe(400);
    });
  });
  it('should return 400 for a bad request with no body', () => {
    return superagent.put('http://localhost:3000/hours/5a075729fafff0ad7a6c4f29')
    .send()
    .catch( res => {
      expect(res.status).toBe(400);
    });
  });
  it('should return 404 for a request made with an id that was not found', () => {
    return superagent.put('http://localhost:3000/sushi/')
    .send({name: 'spider'})
    .catch( res => {
      expect(res.status).toBe(404);
    });
  });
  it('should return 404 for a request made with an id that was not found', () => {
    return superagent.put('http://localhost:3000/hours/')
    .send({name: 'spider'})
    .catch( res => {
      expect(res.status).toBe(404);
    });
  });
});

describe('post routes', () => {
  it('should return 200 for creating a valid resource', () => {
    return superagent.post('http://localhost:3000/sushi')
    .send({name: 'Hamachi', topping: 'seaweed', price: '11'})
    .then( res => {
      expect(res.status).toBe(200);
    });
  });
  it('should return 200 for creating a valid resource', () => {
    return superagent.post('http://localhost:3000/hours')
    .send({name: 'hamachi nigiri', price: '6', Sushi_id: '5a075729fafff0ad7a6c4f29'})
    .then( res => {
      expect(res.status).toBe(200);
      expect(res.body.Sushi_id).toBe('5a075729fafff0ad7a6c4f29');
    });
  });
  it('should return a 400 for a bad request with no request body', () => {
    return superagent.post('http://localhost:3000/sushi')
    .send({name: 'Spicy Tuna'})
    .catch( res => {
      expect(res.status).toBe(400);
    });
  });
  it('should return a 400 for a bad request with no request body', () => {
    return superagent.post('http://localhost:3000/hours')
    .send({name: 'Spicy Tuna'})
    .catch( res => {
      expect(res.status).toBe(400);
    });
  });
});
