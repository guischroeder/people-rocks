import { Get, JsonController, Param } from 'routing-controllers';
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
  public async getManagerTeam(
    @Param('id') managerId: string,
  ): Promise<Employee[]> {
    return await this.managerService.getManagerTeam(managerId);
  }

  @Get('/:id/team/led-employees')
  public async getLedEmployeesTeamMembers(
    @Param('id') managerId: string,
  ): Promise<Employee[]> {
    return await this.managerService.getLedEmployeesTeamMembers(managerId);
  }
}
