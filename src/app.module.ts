import Joi from '@hapi/joi';
import * as winston from 'winston';
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { green, yellow, red } from 'colors/safe';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { CompaniesModule } from './companies/companies.module';
import { AppConfigService } from './config/app-config.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CompaniesModule,
    AppConfigModule,
    WinstonModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        level: appConfigService.getLogLevel,
        format: winston.format.json(),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.printf(({ context, level, message, timestamp }) => {
                let colorFn;

                switch (level) {
                  case 'warn':
                    colorFn = yellow;
                    break;
                  case 'error':
                    colorFn = red;
                    break;
                  default:
                    colorFn = green;
                    break;
                }

                const safeContext = context ? `[${context}] ` : '';
                return colorFn(`[${level.toUpperCase()}] ${timestamp} - ${safeContext}${message}`);
              }),
            ),
          }),
        ],
      }),
      inject: [AppConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'testing', 'staging', 'production')
          .required(),
        AUTH_SECRET: Joi.string()
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
})
export class AppModule {}
