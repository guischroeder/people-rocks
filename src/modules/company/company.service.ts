import { Inject, Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CompanyDTO } from './company.dto';
import { Company } from './company.entity';
import { CompanyPolicies } from './company.policies';

@Service()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @Inject()
    private readonly companyPolicies: CompanyPolicies,
  ) {}

  public async createCompany(company: CompanyDTO): Promise<Company> {
    const { name } = company;

    await this.checkCompany(company);

    return await this.companyRepository.save({ name });
  }

  public async getAllCompanies(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  public async getOneCompany(id: string): Promise<Company> {
    return await this.companyRepository.findOneOrFail(id);
  }

  private async checkCompany({ name }: CompanyDTO): Promise<void> {
    const company = await this.companyRepository.findOne({ name });

    this.companyPolicies.assertCompanyExist(company);
  }
}
