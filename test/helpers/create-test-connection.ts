import { Connection, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const createTestConnection = async (): Promise<Connection> => {
  const options: PostgresConnectionOptions = {
    name: 'test',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: ['./src/**/**.entity.ts'],
    synchronize: true,
    schema: 'test',
    dropSchema: true,
  };

  return await createConnection(options);
};
