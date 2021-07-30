import { getRepository } from 'typeorm';
import { Company } from '../../src/modules/company/company.entity';
import { Employee } from '../../src/modules/employee/employee.entity';
import { EmployeeBuilder } from './employee-builder';

export const seed = async (): Promise<void> => {
  const companies = await getRepository(Company).save([
    { name: 'Dunder Mifflin' },
    { name: '99' },
    { name: 'People Rocks' },
  ]);

  for (const company of companies) {
    await getRepository(Employee).save(
      new Array(5).fill(new Employee()).map(() =>
        EmployeeBuilder.build({
          company,
        }),
      ),
    );
  }
};
