import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { env } from 'process';

export const options: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: env.TYPEORM_HOST || 'localhost',
  port: Number(env.TYPEORM_PORT) || 5432,
  username: env.TYPEORM_USERNAME || 'postgres',
  password: env.TYPEORM_PASSWORD || 'postgres',
  database: env.TYPEORM_DATABASE || 'postgres',
  entities: ['./src/**/**.entity.ts'],
  synchronize: true,
};
