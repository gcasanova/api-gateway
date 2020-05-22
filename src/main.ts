import { Logger } from 'winston';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { NestFactory, Reflector } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppConfigService } from './config/app-config.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const appConfigService = app.get<AppConfigService>(AppConfigService);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  appConfigService.isAuthEnabled ?
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), new JwtAuthGuard(), new LocalAuthGuard())) :
    logger.warn('Authentication disabled!');

  await app.listen(appConfigService.getAppPort);
}

bootstrap();
