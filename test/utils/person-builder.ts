import { each, makeFactoryWithRequired } from 'factory.ts/lib/sync';
import * as faker from 'faker';
import { Person } from '../../src/modules/person/person.entity';

export const PersonBuilder = makeFactoryWithRequired<
  Partial<Person>,
  'company'
>({
  name: each(() => faker.name.findName()),
  email: each(() => faker.internet.email()),
});
