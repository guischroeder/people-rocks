import {
  createExpressServer,
  RoutingControllersOptions,
  useContainer,
} from 'routing-controllers';
import { Container } from 'typedi';

useContainer(Container);

export class ExpressApp {
  public static createServer(options: RoutingControllersOptions) {
    if (!options.controllers?.length) {
      throw new Error('You must pass controllers for the app');
    }

    return createExpressServer(options);
  }
}
