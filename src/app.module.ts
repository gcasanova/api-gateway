import Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ApiConfigService } from './api-config.service';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    AuthModule,
    CompaniesModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'testing', 'staging', 'production')
          .required(),
      }),
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
  ],
  controllers: [AppController],
  providers: [ApiConfigService],
})
export class AppModule {}
