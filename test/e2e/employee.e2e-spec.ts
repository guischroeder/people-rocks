import { Application } from 'express';
import request from 'supertest';
import { Connection, getRepository } from 'typeorm';
import { dbConnection } from '../../src/core/database';
import { createExpressServer } from '../../src/core/express';
import { Company } from '../../src/modules/company/company.entity';
import { EmployeeController } from '../../src/modules/employee/employee.controller';
import { Employee } from '../../src/modules/employee/employee.entity';
import { OrganizationTreeController } from '../../src/modules/organizational-tree/organizational-tree.controller';
import { seed } from '../utils/seed';
import { testConnectionOptions } from '../utils/test-connection-options';

describe('EmployeeController (e2e)', () => {
  let app: Application;
  let connection: Connection;

  beforeAll(async () => {
    app = createExpressServer({
      controllers: [EmployeeController, OrganizationTreeController],
    });

    connection = await dbConnection(testConnectionOptions);

    await seed();
  });

  afterAll(() => {
    connection?.close();
  });

  it('GET /employees', async () => {
    const { body } = await request(app).get('/employees').expect(200);

    expect(body).toHaveLength(15);
  });

  describe('POST /employees', () => {
    it('should create a new employee', async () => {
      const dunderMifflin = await getRepository(Company).findOneOrFail({
        name: 'Dunder Mifflin',
      });

      const payload = {
        name: 'Michael Scott',
        email: 'michaelscott@dundermifflin.com',
        companyId: dunderMifflin.id,
      };

      const { body } = await request(app)
        .post('/employees')
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
        .post('/employees')
        .send(payload)
        .expect(500);

      expect(body.name).toBe('EntityNotFound');
    });
  });

  describe('PUT /employees/:id', () => {
    let dunderMifflin: Company;
    let nineNine: Company;

    beforeAll(async () => {
      const [company1, company2] = await getRepository(Company).find({
        where: [{ name: 'Dunder Mifflin' }, { name: '99' }],
      });

      dunderMifflin = company1;
      nineNine = company2;
    });

    it('should assign a employee as a manager of another', async () => {
      const employees = await getRepository(Employee).find();
      const employee = employees[0];
      const anotherEmployee = employees[1];

      const { body } = await request(app)
        .put(`/employees/${employee.id}`)
        .send({ managerId: anotherEmployee.id })
        .expect(200);

      expect(body).toMatchObject({
        ...employee,
        managerId: anotherEmployee.id,
      });
    });

    it('should throw error by assigning a employee to manage his own manager', async () => {
      const [manager, employee] = await getRepository(Employee).find({
        companyId: dunderMifflin.id,
      });

      const managedEmployee = await getRepository(Employee).save({
        ...employee,
        managerId: manager.id,
      });

      const { body } = await request(app)
        .put(`/employees/${managedEmployee.id}`)
        .send({ managerId: manager.id })
        .expect(500);

      expect(body.name).toBe('EmployeeCanNotManageOwnManager');
    });

    it('should throw error by assigning a manger to a employee from another company', async () => {
      const dunderMifflinEmployee = await getRepository(Employee).findOneOrFail(
        {
          companyId: dunderMifflin.id,
        },
      );
      const nineNineEmployee = await getRepository(Employee).findOneOrFail({
        companyId: nineNine.id,
      });

      const { body } = await request(app)
        .put(`/employees/${dunderMifflinEmployee.id}`)
        .send({ managerId: nineNineEmployee.id })
        .expect(500);

      expect(body.name).toBe('EmployeesAreNotFromSameCompany');
    });

    it('GET /employees/:id/pairs', async () => {
      const [manager, employeeOne, employeeTwo, employeeThree] =
        await getRepository(Employee).find({
          companyId: nineNine.id,
        });

      const employees = [employeeOne, employeeTwo, employeeThree].map(
        (employee) => ({
          ...employee,
          managerId: manager.id,
        }),
      );
      await getRepository(Employee).save(employees);

      const { body } = await request(app)
        .get(`/employees/${employeeOne.id}/pairs`)
        .expect(200);

      employees.shift();
      expect(body).toEqual(employees);
    });
  });
});
