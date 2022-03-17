import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection, Query } from 'cypher-query-builder';

@Injectable()
export class QueryRepository implements OnApplicationShutdown {
  constructor(
    @Inject('NEO4J_CONNECTION') private readonly connection: Connection,
  ) {}
  onApplicationShutdown(): any {
    this.connection.close();
  }

  initQuery(): Query {
    return this.connection.query();
  }
}
