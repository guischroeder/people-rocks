import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { options } from './config/ormconfig';
import { log } from './logger';

useContainer(Container);

export const dbConnection = async () => {
  const connection = await createConnection({
    ...options,
    logger: 'debug',
    logging: ['error'],
  });

  log.info(`Connected to Postgres at ${options.host}:${options.port}`);

  return connection;
};
