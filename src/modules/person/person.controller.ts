import 'reflect-metadata';
import { Body, Get, JsonController, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { PersonDTO } from './person.dto';
import { Person } from './person.entity';
import { PersonService } from './person.service';

@Service()
@JsonController('/persons')
export class PersonController {
  constructor(
    @Inject()
    private readonly personService: PersonService,
  ) {}

  @Post()
  public async createPerson(@Body() person: PersonDTO): Promise<Person> {
    return await this.personService.createPerson(person);
  }

  @Get()
  public async getAllPersons(): Promise<Person[]> {
    return await this.personService.getAllPersons();
  }
}