import 'reflect-metadata';
import bodyParser from 'body-parser';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import express, { Application } from 'express';
import {
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useContainer,
  useExpressServer,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { Container } from 'typedi';
import { EmployeeController } from '../modules/employee/employee.controller';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

useContainer(Container);

export const createApp = (
  routingControllersOPtions: RoutingControllersOptions,
): Application => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const storage = getMetadataArgsStorage();
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });
  const spec = routingControllersToSpec(
    storage,
    { controllers: [EmployeeController] },
    {
      info: {
        description: 'A simple API to create simple company',
        title: 'People Rocks API',
        version: '1.2.0',
      },
      components: {
        schemas,
      },
    },
  );

  app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

  useExpressServer(app, routingControllersOPtions);

  return app;
};
