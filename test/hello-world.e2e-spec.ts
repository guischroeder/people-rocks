import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import request from 'supertest';
import { Connection } from 'typeorm';
import { HelloWorldController } from '../src/modules/hello-world';
import { createTestConnection } from './helpers/create-test-connection';

describe('HelloWorldController', () => {
  let app: Application;
  let connection: Connection;

  beforeAll(async () => {
    app = createExpressServer({
      controllers: [HelloWorldController],
    });

    connection = await createTestConnection();
  });

  afterAll(() => connection.close());

  it('GET /', async () => {
    const res = await request(app).get('/').expect(200);
    expect(res.text).toBe('Hello World');
  });
});
