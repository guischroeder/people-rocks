import { Get, JsonController, Param } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Inject, Service } from 'typedi';
import { Employee } from '../employee/employee.entity';
import { ManagerService } from './manager.service';

@Service()
@JsonController('/managers')
export class ManagerController {
  constructor(
    @Inject()
    private readonly managerService: ManagerService,
  ) {}

  @Get('/:id/team')
  @OpenAPI({ summary: 'Get all members from manager team' })
  public async getManagerTeam(
    @Param('id') managerId: string,
  ): Promise<Employee[]> {
    return await this.managerService.getManagerTeam(managerId);
  }

  @Get('/:id/team/led-employees')
  @OpenAPI({
    summary:
      'Get all members of each team of led employees managed by a given manager',
    description: 'Manager -> Led Employees -> Members (Second Level)',
  })
  public async getLedEmployeesTeamMembers(
    @Param('id') managerId: string,
  ): Promise<Employee[]> {
    return await this.managerService.getLedEmployeesTeamMembers(managerId);
  }
}
