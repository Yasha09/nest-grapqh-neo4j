import { DynamicModule, Module } from '@nestjs/common';
import { ConnectionWithDriver, Neo4jConfig } from './neo4j-config.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'cypher-query-builder';
import { ConnectionError, createDatabaseConfig } from './neo4j.utils';
import { NEO4J_CONFIG, NEO4J_CONNECTION } from './neo4j.constants';
import { QueryRepository } from './neo4j.service';

@Module({
  providers: [QueryRepository],
})
export class Neo4jModule {
  static forRootAsync(customConfig?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            createDatabaseConfig(configService, customConfig),
        },
        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => {
            try {
              const { host, schema, port, username, password } = config;
              const connection = new Connection(`${schema}://${host}:${port}`, {
                username,
                password,
              }) as ConnectionWithDriver;
              await connection.driver.verifyConnectivity();
              console.log('Success connected');
              return connection;
            } catch (err) {
              throw new ConnectionError(err);
            }
          },
        },
      ],
      exports: [QueryRepository],
    };
  }
}
