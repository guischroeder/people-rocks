import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { log } from './logger';

useContainer(Container);

export const dbConnection = async (options: PostgresConnectionOptions) => {
  const connection = await createConnection({
    ...options,
    logger: 'debug',
    logging: ['error'],
  });

  log.info(`Connected to Postgres at ${options.host}:${options.port}`);

  return connection;
};
