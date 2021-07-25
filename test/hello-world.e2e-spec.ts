import request from 'supertest';
import { app } from '../src/app';

describe('HelloWorldController', () => {
  it('GET /', async () => {
    const res = await request(app).get('/').expect(200);

    expect(res.text).toBe('Hello World');
  });
});
