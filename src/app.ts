import 'reflect-metadata';
import { Response } from 'express';
import { createExpressServer, Controller, Get, Res } from 'routing-controllers';

@Controller('/')
export class HelloWorldController {
  @Get('/')
  public sayHello(@Res() res: Response): void {
    res.send('Hello World');
  }
}

export const app = createExpressServer({
  controllers: [HelloWorldController],
});
