import 'reflect-metadata';

import { Container } from 'typedi';
import { Company } from '../company.entity';
import { CompanyAlreadyExists, CompanyPolicies } from '../company.policies';

describe('Company Policies', () => {
  let companyPolicies: CompanyPolicies;

  beforeAll(() => {
    companyPolicies = Container.get(CompanyPolicies);
  });

  it('should not throw error if a company does not exist', () => {
    expect(() => companyPolicies.assertCompanyExists()).not.toThrow();
  });

  it('shoul throw error if a company with given name already exist', () => {
    const company = new Company();
    company.name = 'Dunder Mifflin';

    expect(() => companyPolicies.assertCompanyExists(company)).toThrow(
      CompanyAlreadyExists,
    );
  });
});
