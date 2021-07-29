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

    expect(body).toHaveLength(20);
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

  describe('PUT /persons/:id', () => {
    it('should assign a person as a manager of another', async () => {
      const persons = await getRepository(Person).find();
      const person = persons[0];
      const anotherPerson = persons[1];

      const { body } = await request(app)
        .put(`/persons/${person.id}`)
        .send({ managerId: anotherPerson.id })
        .expect(200);

      expect(body).toMatchObject({ ...person, managerId: anotherPerson.id });
    });

    it('should throw error by assigning a person to manage his own manager', async () => {
      const dunderMifflin = await getRepository(Company).findOneOrFail({
        name: 'Dunder Mifflin',
      });
      const [personToManage, personToBeManaged] = await getRepository(
        Person,
      ).find({
        companyId: dunderMifflin.id,
      });

      const personManaged = await getRepository(Person).save({
        ...personToBeManaged,
        managerId: personToManage.id,
      });

      const { body } = await request(app)
        .put(`/persons/${personManaged.id}`)
        .send({ managerId: personToManage.id })
        .expect(500);

      expect(body.name).toBe('PersonCanNotManageOwnManager');
    });

    it('should throw error by assigning a manger to a person from another company', async () => {
      const [dunderMifflin, nineNine] = await getRepository(Company).find({
        where: [{ name: 'Dunder Mifflin' }, { name: '99' }],
      });

      const personFromDunderMifflin = await getRepository(Person).findOneOrFail(
        {
          companyId: dunderMifflin.id,
        },
      );
      const personFromNineNine = await getRepository(Person).findOneOrFail({
        companyId: nineNine.id,
      });

      const { body } = await request(app)
        .put(`/persons/${personFromDunderMifflin.id}`)
        .send({ managerId: personFromNineNine.id })
        .expect(500);

      expect(body.name).toBe('PersonsAreNotFromSameCompany');
    });

    it('GET /persons/employees/:id/pairs', async () => {
      const nineNine = await getRepository(Company).findOneOrFail({
        name: '99',
      });
      const [manager, employeeOne, employeeTwo, employeeThree] =
        await getRepository(Person).find({
          companyId: nineNine.id,
        });

      const employees = [employeeOne, employeeTwo, employeeThree].map(
        (employee) => ({
          ...employee,
          managerId: manager.id,
        }),
      );
      await getRepository(Person).save(employees);

      const { body } = await request(app)
        .get(`/persons/employees/${employeeOne.id}/pairs`)
        .expect(200);

      employees.shift();
      expect(body).toEqual(employees);
    });
  });

  it('GET /persons/managers/:id/team', async () => {
    const peopleRocks = await getRepository(Company).findOneOrFail({
      name: 'People Rocks',
    });
    const [manager, employeeOne, employeeTwo, employeeThree] =
      await getRepository(Person).find({
        companyId: peopleRocks.id,
      });

    const employees = [employeeOne, employeeTwo, employeeThree].map(
      (employee) => ({
        ...employee,
        managerId: manager.id,
      }),
    );

    await getRepository(Person).save(employees);

    const { body } = await request(app)
      .get(`/persons/managers/${manager.id}/team`)
      .expect(200);

    expect(body).toEqual(employees);
  });

  it('GET /persons/organizational-graph/:id', async () => {
    const apple = await getRepository(Company).findOneOrFail({
      name: 'Thoughtworks',
    });
    const [manager, employeeOne, employeeTwo, employeeThree] =
      await getRepository(Person).find({
        companyId: apple.id,
      });

    await getRepository(Person).save({
      ...employeeOne,
      managerId: manager.id,
    });

    for (const employee of [employeeTwo, employeeThree]) {
      await getRepository(Person).save({
        ...employee,
        managerId: employeeOne.id,
      });
    }

    const { body } = await request(app)
      .get(`/persons/organizational-graph/${manager.id}`)
      .expect(200);

    expect(body).toEqual({
      [employeeOne.id]: {
        [employeeTwo.id]: {},
        [employeeThree.id]: {},
      },
    });
  });
});
