import { Query, Resolver } from '@nestjs/graphql';
import { Person } from './schema/graphql';

@Resolver()
export class AppResolver {
  @Query()
  helloWorld() {
    return 'Hello World!';
  }
}
