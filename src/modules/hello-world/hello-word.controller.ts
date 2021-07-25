import 'reflect-metadata';
import { Controller, Get } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { HelloWorldService } from './hello-world.service';

@Controller('/')
@Service()
export class HelloWorldController {
  constructor(
    @Inject()
    private readonly helloWorldService: HelloWorldService,
  ) {}

  @Get('/')
  public hello() {
    return this.helloWorldService.hello();
  }
}
