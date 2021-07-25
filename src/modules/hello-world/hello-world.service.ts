import 'reflect-metadata';
import { Service } from 'typedi';

@Service()
export class HelloWorldService {
  public hello() {
    return 'Hello World';
  }
}
