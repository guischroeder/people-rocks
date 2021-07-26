import { Service } from 'typedi';
import { Company } from './company.entity';

@Service()
export class CompanyPolicies {
  public assertCompanyExist(company?: Company): void {
    if (company) {
      throw new Error(`A company with name ${company.name} already exists`);
    }
  }
}
