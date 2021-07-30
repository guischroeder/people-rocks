import { each, makeFactoryWithRequired } from 'factory.ts/lib/sync';
import * as faker from 'faker';
import { Employee } from '../../src/modules/employee/employee.entity';

export const EmployeeBuilder = makeFactoryWithRequired<
  Partial<Employee>,
  'company'
>({
  name: each(() => faker.name.findName()),
  email: each(() => faker.internet.email()),
});
