import 'reflect-metadata';
import { useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { ConnectionIsNotSetError } from 'typeorm/error';
import { options } from './core/config/ormconfig';
import { dbConnection } from './core/database';
import { createExpressServer } from './core/express';
import { log } from './core/logger';

const PORT = process.env.PORT || 3000;

useContainer(Container);

const app = createExpressServer({
  controllers: [__dirname + '/modules/**/*.controller.ts'],
});

const init = async () => {
  await dbConnection(options);

  app.listen(PORT, () => log.info(`Listening on port ${PORT}`));
};

init().catch((error: ConnectionIsNotSetError) => {
  if (!error.stack) {
    log.error(error.message);
  }
  process.exit(1);
});
