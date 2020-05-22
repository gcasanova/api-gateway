import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    AuthModule,
    CompaniesModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.${process.env.NODE_ENV}.env`,
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
  ],
  controllers: [AppController]
})
export class AppModule {}
