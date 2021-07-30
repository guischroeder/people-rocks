import 'reflect-metadata';
import { useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import { ConnectionIsNotSetError } from 'typeorm/error';
import { options } from './core/config/ormconfig';
import { dbConnection } from './core/database';
import { createExpressServer } from './core/express';
import { log } from './core/logger';
import { CompanyController } from './modules/company/company.controller';
import { EmployeeController } from './modules/employee/employee.controller';
import { ManagerController } from './modules/manager/manager.controller';
import { OrganizationTreeController } from './modules/organizational-tree/organizational-tree.controller';

const PORT = process.env.PORT || 3000;

useContainer(Container);

const app = createExpressServer({
  controllers: [
    CompanyController,
    EmployeeController,
    ManagerController,
    OrganizationTreeController,
  ],
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
