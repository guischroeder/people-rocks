import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import request from 'supertest';
import { HelloWorldController } from '../src/app';

describe('HelloWorldController', () => {
  let app: Application;

  beforeAll(async () => {
    app = createExpressServer({
      controllers: [HelloWorldController],
      defaultErrorHandler: false,
    });
  });

  it('GET /', async () => {
    const res = await request(app).get('/').expect(200);
    expect(res.text).toBe('Hello World');
  });
});
