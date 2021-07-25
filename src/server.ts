import 'reflect-metadata';
import { ConnectionIsNotSetError } from 'typeorm/error';
import { dbConnection } from './core/database';
import { ExpressApp } from './core/ExpressApp';
import { log } from './core/logger';
import { HelloWorldController } from './modules/hello-world';

const PORT = process.env.PORT || 3000;

const app = ExpressApp.createServer({
  controllers: [HelloWorldController],
});

const init = async () => {
  await dbConnection();
  app.listen(PORT, () => log.info(`Listening on port ${PORT}`));
};

init().catch((error: ConnectionIsNotSetError) => {
  if (!error.stack) {
    log.error(error.message);
  }
  process.exit(1);
});
