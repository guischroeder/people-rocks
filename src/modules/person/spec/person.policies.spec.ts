import 'reflect-metadata';

import { Container } from 'typedi';
import { Person } from '../person.entity';
import { PersonAlreadyExists, PersonPolicies } from '../person.policies';

describe('Person Policies', () => {
  let personPolicies: PersonPolicies;

  beforeAll(() => {
    personPolicies = Container.get(PersonPolicies);
  });

  it('should not throw error if a company does not exist', () => {
    expect(() => personPolicies.assertPersonExists()).not.toThrow();
  });

  it('shoul throw error if a person with given name already exist', () => {
    const person = new Person();
    person.name = 'Michael Scott';

    expect(() => personPolicies.assertPersonExists(person)).toThrow(
      PersonAlreadyExists,
    );
  });
});
