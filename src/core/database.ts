import { createConnection } from 'typeorm';
import { options } from './config/ormconfig';
import { log } from './logger';

export const dbConnection = async () => {
  const connection = await createConnection({
    ...options,
    logger: 'debug',
    logging: ['error'],
  });

  log.info(`Connected to Postgres at ${options.host}:${options.port}`);

  return connection;
};
