import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphQLFormattedError } from 'graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';


@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      csrfPrevention: false,
      introspection: true,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (formattedError: GraphQLFormattedError, error: unknown): GraphQLFormattedError => {
          return {
            message: formattedError.message,
            path: formattedError.path, // can be undefined
            extensions: {
              statusCode: (error as any)?.extensions?.exception?.status || 500,
              timestamp: new Date().toISOString(),
            },
          };
        },
      sortSchema: true,
      // playground: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
       plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }),
    }),
    PrismaModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}