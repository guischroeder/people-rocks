import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { options } from '../../src/core/config/ormconfig';

export const testConnectionOptions: PostgresConnectionOptions = {
  ...options,
  entities: ['./src/**/**.entity.ts'],
  schema: 'test',
  dropSchema: true,
};
