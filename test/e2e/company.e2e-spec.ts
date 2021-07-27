import { Application } from 'express';
import request from 'supertest';
import { Connection, getRepository } from 'typeorm';
import { dbConnection } from '../../src/core/database';
import { createExpressServer } from '../../src/core/express';
import { CompanyController } from '../../src/modules/company/company.controller';
import { Company } from '../../src/modules/company/company.entity';
import { seed } from '../utils/seed';
import { testConnectionOptions } from '../utils/test-connection-options';

describe('CompanyController (e2e)', () => {
  let app: Application;
  let connection: Connection;

  beforeAll(async () => {
    app = createExpressServer({ controllers: [CompanyController] });

    connection = await dbConnection(testConnectionOptions);

    await seed();
  });

  afterAll(() => {
    connection?.close();
  });

  it('GET /companies', async () => {
    const { body } = await request(app).get('/companies').expect(200);

    expect(body).toHaveLength(3);
  });

  it('GET /companies/:id', async () => {
    const companies = await getRepository(Company).find();
    const { id } = companies[0];

    const { body } = await request(app).get(`/companies/${id}`).expect(200);

    expect(body).toEqual(companies[0]);
  });

  describe('POST /companies', () => {
    it('should create new company', async () => {
      const { body } = await request(app)
        .post('/companies')
        .send({ name: 'Apple' })
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          name: 'Apple',
        }),
      );
    });

    it('should throw error when company already exists', async () => {
      const { body } = await request(app)
        .post('/companies')
        .send({ name: 'Dunder Mifflin' })
        .expect(500);

      expect(body.name).toBe('CompanyAlreadyExists');
    });
  });
});
