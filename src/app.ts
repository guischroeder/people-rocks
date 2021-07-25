import {
  Response,
  Controller,
  Get,
  attachControllers,
} from '@decorators/express';
import express from 'express';

export const app = express();

@Controller('/')
export class HelloWorldController {
  @Get('/')
  public sayHello(@Response() res: express.Response): void {
    res.send('Hello World');
  }
}

attachControllers(app, [HelloWorldController]);
