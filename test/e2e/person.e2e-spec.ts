import { Application } from 'express';
import request from 'supertest';
import { Connection, getRepository } from 'typeorm';
import { dbConnection } from '../../src/core/database';
import { createExpressServer } from '../../src/core/express';
import { Company } from '../../src/modules/company/company.entity';
import { PersonController } from '../../src/modules/person/person.controller';
import { Person } from '../../src/modules/person/person.entity';
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
    let company: Company;

    beforeAll(async () => {
      company = await getRepository(Company).findOneOrFail({
        name: 'Dunder Mifflin',
      });
    });

    it('should create a new person', async () => {
      const payload = {
        name: 'Michael Scott',
        email: 'michaelscott@dundermifflin.com',
        companyId: company.id,
      };

      const { body } = await request(app)
        .post('/persons')
        .send(payload)
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
      const payload = {
        name: 'Jim Halpert',
        email: 'jimhalper@dundermifflin.com',
        companyId: company.id,
      };

      await getRepository(Person).save(payload);

      const { body } = await request(app)
        .post('/persons')
        .send(payload)
        .expect(500);

      expect(body.name).toEqual('PersonAlreadyExists');
    });

    it('should throw error when given company not exists', async () => {
      const payload = {
        name: 'Jim Halpert',
        email: 'jimhalper@dundermifflin.com',
        companyId: '8fe0bdd2-02ac-40c5-9af5-19f9b6bc2725',
      };

      const { body } = await request(app)
        .post('/persons')
        .send(payload)
        .expect(500);

      expect(body.name).toBe('EntityNotFound');
    });
  });
});
