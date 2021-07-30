import { Application } from 'express';
import request from 'supertest';
import { Connection, getRepository } from 'typeorm';
import { dbConnection } from '../../src/core/database';
import { createExpressServer } from '../../src/core/express';
import { Company } from '../../src/modules/company/company.entity';
import { Employee } from '../../src/modules/employee/employee.entity';
import { ManagerController } from '../../src/modules/manager/manager.controller';
import { seed } from '../utils/seed';
import { testConnectionOptions } from '../utils/test-connection-options';

describe('ManagerController (e2e)', () => {
  let app: Application;
  let connection: Connection;

  beforeAll(async () => {
    app = createExpressServer({
      controllers: [ManagerController],
    });

    connection = await dbConnection(testConnectionOptions);

    await seed();
  });

  afterAll(() => {
    connection?.close();
  });

  it('GET /managers/:id/team', async () => {
    const dunderMifflin = await getRepository(Company).findOneOrFail({
      name: 'Dunder Mifflin',
    });
    const [manager, memberOne, memberTwo, memberThree] = await getRepository(
      Employee,
    ).find({
      companyId: dunderMifflin.id,
    });

    const members = [memberOne, memberTwo, memberThree].map((member) => ({
      ...member,
      managerId: manager.id,
    }));

    await getRepository(Employee).save(members);

    const { body } = await request(app)
      .get(`/managers/${manager.id}/team`)
      .expect(200);

    expect(body).toEqual(members);
  });

  it('GET /managers/:id/led-employees', async () => {
    const nineNine = await getRepository(Company).findOneOrFail({
      name: '99',
    });

    const [manager, ledEmployee, memberOne, memberTwo] = await getRepository(
      Employee,
    ).find({
      companyId: nineNine.id,
    });

    await getRepository(Employee).save({
      ...ledEmployee,
      managerId: manager.id,
    });

    const members = [memberOne, memberTwo].map((member) => ({
      ...member,
      managerId: ledEmployee.id,
    }));

    await getRepository(Employee).save(members);

    const { body } = await request(app)
      .get(`/managers/${manager.id}/team/led-employees`)
      .expect(200);

    expect(body).toEqual(members);
  });
});
