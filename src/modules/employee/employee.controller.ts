import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
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
  public async createEmployee(@Body() payload: EmployeeDTO): Promise<Employee> {
    return await this.employeeService.createEmployee(payload);
  }

  @Get()
  public async getAllEmployees(): Promise<Employee[]> {
    return await this.employeeService.getAllEmployees();
  }

  @Get('/:id')
  public async getEmployee(@Param('id') id: string): Promise<Employee> {
    return await this.employeeService.getEmployee(id);
  }

  @Put('/:id')
  public async assignManager(
    @Param('id') employeeId: string,
    @Body() { managerId }: { managerId: string },
  ): Promise<Employee> {
    return await this.employeeService.assignManager(employeeId, managerId);
  }

  @Delete('/:id')
  public async deleteEmployee(@Param('id') id: string): Promise<Employee> {
    return await this.employeeService.deleteEmployee(id);
  }

  @Get('/:id/pairs') public async getEmployeePairs(
    @Param('id') employeeId: string,
  ): Promise<Employee[]> {
    return await this.employeeService.getEmployeePairs(employeeId);
  }
}
