import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Employee } from '../employee/employee.entity';

@Service()
export class ManagerService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  public async getManagerTeam(managerId: string): Promise<Employee[]> {
    return await this.repository.find({ managerId });
  }

  public async getLedEmployeesTeamMembers(
    managerId: string,
  ): Promise<Employee[]> {
    const managerTeam = await this.getManagerTeam(managerId);

    let ledEmployeesTeamMembers: Employee[] = [];
    for (const managerEmployee of managerTeam) {
      const employees = await this.getManagerTeam(managerEmployee.id);

      ledEmployeesTeamMembers = [...ledEmployeesTeamMembers, ...employees];
    }

    return ledEmployeesTeamMembers;
  }
}
