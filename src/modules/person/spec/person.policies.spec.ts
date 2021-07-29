import 'reflect-metadata';

import { Container } from 'typedi';
import { Person } from '../person.entity';
import {
  PersonPolicies,
  PersonsAreNotFromSameCompany,
  PersonCanNotManageOwnManager,
} from '../person.policies';

describe('Person Policies', () => {
  let personPolicies: PersonPolicies;

  beforeAll(() => {
    personPolicies = Container.get(PersonPolicies);
  });

  describe('#assertPersonsAreNotFromSameCompany', () => {
    it('should throw error if employee and manager are not from the same company', () => {
      const personToManage = { companyId: '123' };
      const personToBeManaged = { companyId: '456' };

      expect(() =>
        personPolicies.assertPersonsAreNotFromSameCompany(
          personToManage as Person,
          personToBeManaged as Person,
        ),
      ).toThrow(PersonsAreNotFromSameCompany);
    });

    it('should not throw error if employee and manager are from the same company', () => {
      const personToManage = { companyId: '123' };
      const personToBeManaged = { companyId: '123' };

      expect(() =>
        personPolicies.assertPersonsAreNotFromSameCompany(
          personToBeManaged as Person,
          personToManage as Person,
        ),
      ).not.toThrow();
    });
  });

  describe('#assertPersonCanNotManageOwnManager', () => {
    it('should throw error by assigning employee to manage his own manager', () => {
      const personToManage = { id: '123', managerId: '456' };
      const personToBeManaged = { id: '456', managerId: '123' };

      expect(() =>
        personPolicies.assertPersonCanNotManageOwnManager(
          personToBeManaged as Person,
          personToManage as Person,
        ),
      ).toThrow(PersonCanNotManageOwnManager);
    });

    it('should not throw error by assigning employee to manage another employee', () => {
      const personToManage = { id: '123', managerId: '456' };
      const personToBeManaged = { id: '789', managerId: '' };

      expect(() =>
        personPolicies.assertPersonCanNotManageOwnManager(
          personToBeManaged as Person,
          personToManage as Person,
        ),
      ).not.toThrow();
    });
  });
});
