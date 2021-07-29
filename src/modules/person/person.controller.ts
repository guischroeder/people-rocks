import 'reflect-metadata';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
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

  @Get('/:id')
  public async getOnePerson(@Param('id') id: string): Promise<Person> {
    return await this.personService.getOnePerson(id);
  }

  @Put('/:id')
  public async assignManager(
    @Param('id') personId: string,
    @Body() { managerId }: { managerId: string },
  ): Promise<Person> {
    return await this.personService.assignManager(personId, managerId);
  }

  @Delete('/:id')
  public async deletePerson(@Param('id') id: string): Promise<Person> {
    return await this.personService.deletePerson(id);
  }
}
