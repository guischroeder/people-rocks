import { Inject, Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CompanyService } from '../company/company.service';
import { PersonDTO } from './person.dto';
import { Person } from './person.entity';
import { PersonPolicies } from './person.policies';

@Service()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @Inject()
    private readonly companyService: CompanyService,
    private readonly personPolicies: PersonPolicies,
  ) {}

  public async createPerson(person: PersonDTO): Promise<Person> {
    const company = await this.companyService.getOneCompany(person.companyId);

    return this.personRepository.save({
      ...person,
      company,
    });
  }

  public async getAllPersons(): Promise<Person[]> {
    return this.personRepository.find();
  }

  public async getOnePerson(id: string): Promise<Person> {
    return await this.personRepository.findOneOrFail({ id });
  }

  public async assignManager(
    personId: string,
    managerId: string,
  ): Promise<Person> {
    const person = await this.getOnePerson(personId);
    const manager = await this.getOnePerson(managerId);

    this.personPolicies.assertPersonsAreNotFromSameCompany(person, manager);
    this.personPolicies.assertPersonCanNotManageOwnManager(person, manager);

    return await this.personRepository.save({
      ...person,
      managerId,
    });
  }

  public async deletePerson(id: string): Promise<Person> {
    const person = await this.getOnePerson(id);

    // Setting managerId to null for each person manually once
    // cascade is not working for relations with the same entity
    const managedByDeletedPerson = await this.personRepository.find({
      managerId: person.id,
    });

    for (const managedPerson of managedByDeletedPerson) {
      await this.personRepository.save({
        ...managedPerson,
        managerId: null,
      });
    }

    return await this.personRepository.remove(person);
  }
}
