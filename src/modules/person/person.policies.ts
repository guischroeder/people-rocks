import { Service } from 'typedi';
import { Person } from './person.entity';

export class PersonsAreNotFromSameCompany extends Error {
  constructor(person: Person, manager: Person) {
    super();
    this.message = `${manager.name} can not be manager of ${person.name} because they are not from the same company`;
    this.name = 'PersonsAreNotFromSameCompany';
  }
}

export class PersonCanNotManageOwnManager extends Error {
  constructor(person: Person, manager: Person) {
    super();
    this.message = `${manager.name} can not be managed by ${person.name} because this is already your own direct employee`;
    this.name = 'PersonCanNotManageOwnManager';
  }
}

@Service()
export class PersonPolicies {
  public assertPersonsAreNotFromSameCompany(
    person: Person,
    personToManage: Person,
  ): void {
    if (person.companyId !== personToManage.companyId) {
      throw new PersonsAreNotFromSameCompany(person, personToManage);
    }
  }

  public assertPersonCanNotManageOwnManager(person: Person, manager: Person) {
    if (person.managerId === manager.id) {
      throw new PersonCanNotManageOwnManager(person, manager);
    }
  }
}
