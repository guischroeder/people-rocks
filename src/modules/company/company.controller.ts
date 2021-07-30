import 'reflect-metadata';
import { Body, JsonController, Get, Param, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
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
  @OpenAPI({ summary: 'Create a new company' })
  public async createCompany(@Body() company: CompanyDTO): Promise<Company> {
    return await this.companyService.createCompany(company);
  }

  @Get()
  @OpenAPI({ summary: 'Get all existing companies' })
  public async getAllCompanies(): Promise<Company[]> {
    return await this.companyService.getAllCompanies();
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Get an existing company' })
  public async getOneCompany(@Param('id') id: string): Promise<Company> {
    return await this.companyService.getOneCompany(id);
  }
}
