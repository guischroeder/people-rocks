import { Application } from 'express';
import request from 'supertest';
import { Connection, getRepository } from 'typeorm';
import { dbConnection } from '../../src/core/database';
import { createApp } from '../../src/core/create-app';
import { Company } from '../../src/modules/company/company.entity';
import { Employee } from '../../src/modules/employee/employee.entity';
import { OrganizationTreeController } from '../../src/modules/organizational-tree/organizational-tree.controller';
import { seed } from '../utils/seed';
import { testConnectionOptions } from '../utils/test-connection-options';

describe('OrganizationalTreeController (e2e)', () => {
  let app: Application;
  let connection: Connection;

  beforeAll(async () => {
    app = createApp({
      controllers: [OrganizationTreeController],
    });

    connection = await dbConnection(testConnectionOptions);

    await seed();
  });

  afterAll(() => {
    connection?.close();
  });

  it('GET /organizational-tree/:managerId/', async () => {
    const apple = await getRepository(Company).findOneOrFail({
      name: 'Dunder Mifflin',
    });
    const [manager, employeeOne, employeeTwo, employeeThree] =
      await getRepository(Employee).find({
        companyId: apple.id,
      });

    await getRepository(Employee).save({
      ...employeeOne,
      managerId: manager.id,
    });

    for (const employee of [employeeTwo, employeeThree]) {
      await getRepository(Employee).save({
        ...employee,
        managerId: employeeOne.id,
      });
    }

    const { body } = await request(app)
      .get(`/organizational-tree/${manager.id}`)
      .expect(200);

    expect(body).toEqual({
      [employeeOne.id]: {
        [employeeTwo.id]: {},
        [employeeThree.id]: {},
      },
    });
  });
});
