import { getRepository } from 'typeorm';
import { Company } from '../../src/modules/company/company.entity';

export const seed = async (): Promise<void> => {
  await getRepository(Company).save([
    { name: 'Dunder Mifflin' },
    { name: '99ª' },
    { name: 'Peoples Rocks' },
  ]);
};
