import { Inject, Service } from 'typedi';
import { EmployeeService } from '../employee/employee.service';
import { ManagerService } from '../manager/manager.service';

@Service()
export class OrganizationTreeService {
  constructor(
    @Inject()
    private readonly employeeService: EmployeeService,
    private readonly managerService: ManagerService,
  ) {}

  public async getOrganizationalTree(
    managerId: string,
  ): Promise<Record<string, unknown>> {
    await this.assertEmployeeExists(managerId);

    return await this.makeTree(managerId);
  }

  private async makeTree(employeeId: string): Promise<Record<string, unknown>> {
    const team = await this.managerService.getManagerTeam(employeeId);
    const tree: Record<string, unknown> = {};

    for (const employee of team) {
      tree[employee.id] = await this.makeTree(employee.id);
    }

    return tree;
  }

  private async assertEmployeeExists(managerId: string): Promise<void> {
    await this.employeeService.getEmployee(managerId);
  }
}
