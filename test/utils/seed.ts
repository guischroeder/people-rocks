import faker from 'faker';
import { getRepository } from 'typeorm';
import { Company } from '../../src/modules/company/company.entity';
import { Person } from '../../src/modules/person/person.entity';
import { PersonBuilder } from './person-builder';

export const seed = async (): Promise<void> => {
  const companies = await getRepository(Company).save([
    { name: 'Dunder Mifflin' },
    { name: '99ª' },
    { name: 'Peoples Rocks' },
  ]);

  await getRepository(Person).save(
    new Array(5)
      .fill(new Person())
      .map(() =>
        PersonBuilder.build({ company: faker.random.arrayElement(companies) }),
      ),
  );
};
