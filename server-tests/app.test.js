import request from 'supertest';
import pool from '../db/index.js';
import app from '../server/app.js';

afterAll(()=> {
  pool.end();
})

describe('GET /products', () => {
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products').expect(200);
  })
  test('response with json', async () => {
    await request(app).get('/products').expect('Content-Type', /json/);
  })
})

describe('GET /products/:product_id', () => {
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products/62621').expect(200);
  })
  test('response with json', async () => {
    await request(app).get('/products/62621').expect('Content-Type', /json/);
  })
})

describe('GET /products/:product_id/styles', () => {
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products/2021/styles').expect(200);
  })
  test('response with json', async () => {
    await request(app).get('/products/2021/styles').expect('Content-Type', /json/);
  })
})

describe('GET /products/:product_id/related', () => {
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products/135/related').expect(200);
  })
  test('response with json', async () => {
    await request(app).get('/products/135/related').expect('Content-Type', /json/);
  })
})