import { Service } from 'typedi';
import { Person } from './person.entity';

export class PersonAlreadyExists extends Error {
  constructor(name: string) {
    super();
    this.message = `A person with name ${name} already exists`;
    this.name = 'PersonAlreadyExists';
  }
}

@Service()
export class PersonPolicies {
  public assertPersonExists(person?: Person): void {
    if (person) {
      throw new PersonAlreadyExists(person.name);
    }
  }
}
