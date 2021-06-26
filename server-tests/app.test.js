import request from 'supertest';
import pool from '../db/index.js';
import app from '../server/app.js';

describe('GET /products', () => {
  afterAll(()=> {
    pool.end();
  })
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products').expect(200);
  })
  test('response with json', async () => {
    await request(app).get('/products').expect('Content-Type', /json/);
  })
})