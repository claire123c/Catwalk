import request from 'supertest';
import pool from '../db/index.js';
import app from '../server/app.js';
import { flatten } from '../server/models/models.js';

afterAll(()=> {
  pool.end();
})

describe('GET /products', () => {
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products').expect(200);
  })
  test('should respond with a 404 status code if count exceeds 1000', async () => {
    await request(app).get('/products/?count=1001').expect(404);
  })
  test('response with json', async () => {
    await request(app).get('/products').expect('Content-Type', /json/);
  })
})

describe('GET /products/:product_id', () => {
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products/62621').expect(200);
  })
  test('should respond with a 404 status code with invalid endpoint', async () => {
    await request(app).get('/products/invalid').expect(404);
  })
  test('response with json', async () => {
    await request(app).get('/products/62621').expect('Content-Type', /json/);
  })
})

describe('GET /products/:product_id/styles', () => {
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products/2021/styles').expect(200);
  })
  test('should respond with a 404 status code with invalid endpoint', async () => {
    await request(app).get('/products/invalid/styles').expect(404);
  })
  test('response with json', async () => {
    await request(app).get('/products/2021/styles').expect('Content-Type', /json/);
  })
})

describe('GET /products/:product_id/related', () => {
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products/135/related').expect(200);
  })
  test('should respond with a 404 status code with invalid endpoint', async () => {
    await request(app).get('/products/invalid/related').expect(404);
  })
  test('response with json', async () => {
    await request(app).get('/products/135/related').expect('Content-Type', /json/);
  })
})

describe('flatten()', () => {
  test('should flatten array of objects', () => {
    const arrOfObjs = [{'1': 1}, {'2': 2}, {'3': 3}];
    expect(flatten(arrOfObjs)).toMatchObject([1, 2, 3]);
  })
  test('should return if input is not array', () => {
    const arrOfObjs = 'invalid';
    expect(flatten(arrOfObjs)).toBeUndefined();

  })
})