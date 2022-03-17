import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppResolver } from './app.resolver';
import { Neo4jModule } from './neo4j/neo4j.module';
import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './domain/nodes/person/person.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    Neo4jModule.forRootAsync(),
    PersonModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
