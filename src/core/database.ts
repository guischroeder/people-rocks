import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

useContainer(Container);

export const dbConnection = async (options: PostgresConnectionOptions) => {
  const connection = await createConnection({
    ...options,
    logger: 'debug',
    logging: ['error'],
  });

  return connection;
};
