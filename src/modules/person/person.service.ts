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

    await this.checkPerson(person);

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

  public async deletePerson(id: string): Promise<Person> {
    const person = await this.getOnePerson(id);

    return await this.personRepository.remove(person);
  }

  private async checkPerson({ name }: PersonDTO): Promise<void> {
    const person = await this.personRepository.findOne({ name });

    this.personPolicies.assertPersonExists(person);
  }
}
