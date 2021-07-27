import 'reflect-metadata';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import {
  RoutingControllersOptions,
  useContainer,
  useExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';

useContainer(Container);

export const createExpressServer = (
  options: RoutingControllersOptions,
): Application => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  useExpressServer(app, options);

  return app;
};
