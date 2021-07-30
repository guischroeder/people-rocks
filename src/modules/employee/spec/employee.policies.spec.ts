import 'reflect-metadata';

import { Container } from 'typedi';
import { Employee } from '../employee.entity';
import {
  EmployeePolicies,
  EmployeesAreNotFromSameCompany,
  EmployeeCanNotManageOwnManager,
} from '../employee.policies';

describe('EmployeePolicies', () => {
  let policies: EmployeePolicies;

  beforeAll(() => {
    policies = Container.get(EmployeePolicies);
  });

  describe('#assertEmployeesAreNotFromSameCompany', () => {
    it('should throw error if employee and manager are not from the same company', () => {
      const manager = { companyId: '123' };
      const employee = { companyId: '456' };

      expect(() =>
        policies.assertEmployeesAreNotFromSameCompany(
          manager as Employee,
          employee as Employee,
        ),
      ).toThrow(EmployeesAreNotFromSameCompany);
    });

    it('should not throw error if employee and manager are from the same company', () => {
      const manager = { companyId: '123' };
      const employee = { companyId: '123' };

      expect(() =>
        policies.assertEmployeesAreNotFromSameCompany(
          employee as Employee,
          manager as Employee,
        ),
      ).not.toThrow();
    });
  });

  describe('#assertEmployeeCanNotManageOwnManager', () => {
    it('should throw error by assigning employee to manage his own manager', () => {
      const manager = { id: '123', managerId: '456' };
      const employee = { id: '456', managerId: '123' };

      expect(() =>
        policies.assertEmployeeCanNotManageOwnManager(
          employee as Employee,
          manager as Employee,
        ),
      ).toThrow(EmployeeCanNotManageOwnManager);
    });

    it('should not throw error by assigning employee to manage another employee', () => {
      const manager = { id: '123', managerId: '456' };
      const employee = { id: '789', managerId: '' };

      expect(() =>
        policies.assertEmployeeCanNotManageOwnManager(
          employee as Employee,
          manager as Employee,
        ),
      ).not.toThrow();
    });
  });
});
