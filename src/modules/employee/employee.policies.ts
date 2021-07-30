import { Service } from 'typedi';
import { Employee } from './employee.entity';

export class EmployeesAreNotFromSameCompany extends Error {
  constructor(employee: Employee, manager: Employee) {
    super();
    this.message = `${manager.name} can not be manager of ${employee.name} because they are not from the same company`;
    this.name = 'EmployeesAreNotFromSameCompany';
  }
}

export class EmployeeCanNotManageOwnManager extends Error {
  constructor(employee: Employee, manager: Employee) {
    super();
    this.message = `${manager.name} can not be managed by ${employee.name} because this is already your own direct employee`;
    this.name = 'EmployeeCanNotManageOwnManager';
  }
}

@Service()
export class EmployeePolicies {
  public assertEmployeesAreNotFromSameCompany(
    employee: Employee,
    manager: Employee,
  ): void {
    if (employee.companyId !== manager.companyId) {
      throw new EmployeesAreNotFromSameCompany(employee, manager);
    }
  }

  public assertEmployeeCanNotManageOwnManager(
    employee: Employee,
    manager: Employee,
  ) {
    if (employee.managerId === manager.id) {
      throw new EmployeeCanNotManageOwnManager(employee, manager);
    }
  }
}
