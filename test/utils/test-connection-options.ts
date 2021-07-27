import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { options } from '../../src/core/config/ormconfig';

export const testConnectionOptions: PostgresConnectionOptions = {
  ...options,
  schema: 'test',
  dropSchema: true,
};
