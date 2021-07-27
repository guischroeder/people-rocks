import 'reflect-metadata';
import { Body, JsonController, Get, Param, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { CompanyDTO } from './company.dto';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Service()
@JsonController('/companies')
export class CompanyController {
  constructor(
    @Inject()
    private readonly companyService: CompanyService,
  ) {}

  @Post()
  public async createCompany(@Body() company: CompanyDTO): Promise<Company> {
    return await this.companyService.createCompany(company);
  }

  @Get()
  public async getAllCompanies(): Promise<Company[]> {
    return await this.companyService.getAllCompanies();
  }

  @Get('/:id')
  public async getOneCompany(@Param('id') id: string): Promise<Company> {
    return await this.companyService.getOneCompany(id);
  }
}
