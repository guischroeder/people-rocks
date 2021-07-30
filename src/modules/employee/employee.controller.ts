import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { EmployeeDTO } from './employee.dto';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';

@Service()
@JsonController('/employees')
export class EmployeeController {
  constructor(
    @Inject()
    private readonly employeeService: EmployeeService,
  ) {}

  @Post()
  @OpenAPI({ summary: 'Create a new employee' })
  public async createEmployee(
    @Body() employee: EmployeeDTO,
  ): Promise<Employee> {
    return await this.employeeService.createEmployee(employee);
  }

  @Get()
  @OpenAPI({ summary: 'Get existing employees from all companies' })
  public async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeService.getAllEmployees();
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Get an existing employee regardless of the company' })
  public async getEmployee(@Param('id') id: string): Promise<Employee> {
    return await this.employeeService.getEmployee(id);
  }

  @Put('/:id')
  @OpenAPI({ summary: 'Assign an employee as manager ot another' })
  public async assignManager(
    @Param('id') employeeId: string,
    @Body() { managerId }: { managerId: string },
  ): Promise<Employee> {
    return await this.employeeService.assignManager(employeeId, managerId);
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Delete an existing employee' })
  public async deleteEmployee(@Param('id') id: string): Promise<Employee> {
    return await this.employeeService.deleteEmployee(id);
  }

  @OpenAPI({
    summary:
      'Get all employees that are managed from the same manager of a given employee, excluding himself',
  })
  @Get('/:id/pairs')
  public async getEmployeePairs(
    @Param('id') employeeId: string,
  ): Promise<Employee[]> {
    return await this.employeeService.getEmployeePairs(employeeId);
  }
}
