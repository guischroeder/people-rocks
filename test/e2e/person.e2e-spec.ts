import { Application } from 'express';
import request from 'supertest';
import { Connection } from 'typeorm';
import { dbConnection } from '../../src/core/database';
import { createExpressServer } from '../../src/core/express';
import { PersonController } from '../../src/modules/person/person.controller';
import { seed } from '../utils/seed';
import { testConnectionOptions } from '../utils/test-connection-options';

describe('PersonController (e2e)', () => {
  let app: Application;
  let connection: Connection;

  beforeAll(async () => {
    app = createExpressServer({ controllers: [PersonController] });

    connection = await dbConnection(testConnectionOptions);

    await seed();
  });

  afterAll(() => {
    connection?.close();
  });

  it('GET /persons', async () => {
    const { body } = await request(app).get('/persons').expect(200);

    expect(body).toHaveLength(5);
  });

  describe('POST /persons', () => {
    const person = {
      name: 'Michael Scott',
      email: 'michaelscott@dundermifflin.com',
      company: 'Dunder Mifflin',
    };

    it('should create a new person', async () => {
      const { body } = await request(app)
        .post('/persons')
        .send(person)
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          name: 'Michael Scott',
          email: 'michaelscott@dundermifflin.com',
          company: expect.objectContaining({
            name: 'Dunder Mifflin',
          }),
        }),
      );
    });

    it('should throw error when person already exists', async () => {
      await request(app).post('/persons').send(person).expect(500);
    });
  });
});
