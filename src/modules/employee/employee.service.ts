import { Inject, Service } from 'typedi';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CompanyService } from '../company/company.service';
import { EmployeeDTO } from './employee.dto';
import { Employee } from './employee.entity';
import { EmployeePolicies } from './employee.policies';

@Service()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
    @Inject()
    private readonly companyService: CompanyService,
    private readonly policies: EmployeePolicies,
  ) {}

  public async createEmployee(employee: EmployeeDTO): Promise<Employee> {
    const company = await this.companyService.getOneCompany(employee.companyId);

    return this.repository.save({
      ...employee,
      company,
    });
  }

  public async getAllEmployees(): Promise<Employee[]> {
    return this.repository.find();
  }

  public async assignManager(
    employeeId: string,
    managerId: string,
  ): Promise<Employee> {
    const employee = await this.getEmployee(employeeId);
    const manager = await this.getEmployee(managerId);

    this.policies.assertEmployeesAreNotFromSameCompany(employee, manager);
    this.policies.assertEmployeeCanNotManageOwnManager(employee, manager);

    return await this.repository.save({
      ...employee,
      managerId,
    });
  }

  public async getEmployee(id: string): Promise<Employee> {
    return await this.repository.findOneOrFail({ id });
  }

  public async getEmployeePairs(employeeId: string): Promise<Employee[]> {
    const employee = await this.getEmployee(employeeId);

    return await this.repository.find({
      where: {
        id: Not(employeeId),
        managerId: employee.managerId || Not(null),
      },
    });
  }

  public async deleteEmployee(id: string): Promise<Employee> {
    const employee = await this.getEmployee(id);

    // Setting managerId to null for each employee manually once
    // cascade is not working for relations with the same entity
    await this.onDeleteSetNull(employee);

    return await this.repository.remove(employee);
  }

  private async onDeleteSetNull(manager: Employee): Promise<void> {
    const employees = await this.repository.find({
      managerId: manager.id,
    });
    for (const employee of employees) {
      await this.repository.save({
        ...employee,
        managerId: null,
      });
    }
  }
}
