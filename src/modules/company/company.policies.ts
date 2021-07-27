import { Service } from 'typedi';
import { Company } from './company.entity';

export class CompanyAlreadyExists extends Error {
  constructor(name: string) {
    super();
    this.message = `A company with name ${name} already exists`;
    this.name = 'CompanyAlreadyExists';
  }
}

@Service()
export class CompanyPolicies {
  public assertCompanyExist(company?: Company): void {
    if (company) {
      throw new CompanyAlreadyExists(company.name);
    }
  }
}
