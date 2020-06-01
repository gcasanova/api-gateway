import Redis from 'ioredis';
import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { NestFactory, Reflector } from '@nestjs/core';
import { LoginGuard } from './auth/guards/login.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppConfigService } from './config/app-config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: false });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const appConfigService = app.get<AppConfigService>(AppConfigService);

  const RedisStore = connectRedis(session);
  const redisClient = new Redis({
    host: appConfigService.getRedisHost,
    db: appConfigService.getRedisDbNumberSessions
  });

  const sessionParams = {
    store: new RedisStore({ client: redisClient }),
    name: appConfigService.getAuthSessionCookieName,
    secret: appConfigService.getAuthSessionSecret,
    saveUninitialized: false,
    resave: true,
    cookie: {
      secure: false,
      maxAge: appConfigService.getAuthSessionCookieMaxAgeInMilliseconds,
    },
  }

  if (appConfigService.getAuthSessionCookieSecure) {
    app.use('trust proxy', 1); // TODO: trust first proxy, verify if actually needed when serving from remote servers
    sessionParams.cookie.secure = true;
  }

  app.use(session(sessionParams));
  app.use(passport.initialize());
  app.use(passport.session());

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  appConfigService.isAuthEnabled ?
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), new LoginGuard(), new AuthenticatedGuard())) :
    logger.warn('Authentication disabled!');

  await app.listen(appConfigService.getAppPort);
}

bootstrap();
