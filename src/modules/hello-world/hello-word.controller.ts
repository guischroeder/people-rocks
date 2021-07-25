import { Response } from 'express';
import { Controller, Get, Res } from 'routing-controllers';

@Controller('/')
export class HelloWorldController {
  @Get('/')
  public sayHello(@Res() res: Response) {
    return res.send('Hello World');
  }
}
