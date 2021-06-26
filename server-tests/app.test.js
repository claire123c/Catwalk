import request from 'supertest';
import pool from '../db/index.js';
import app from '../server/app.js';

describe('GET /products', () => {
  afterEach(()=> {
    pool.end();
  })
  test('should respond with a 200 status code', async () => {
    await request(app).get('/products').expect(200);
  })
})