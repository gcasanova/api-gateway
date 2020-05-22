import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const isAuthenticationEnabled = configService.get<boolean>('AUTHENTICATION_ENABLED', true);

  if (isAuthenticationEnabled) {
      const reflector = app.get(Reflector);
      app.useGlobalGuards(new AuthGuard(reflector, new JwtAuthGuard(), new LocalAuthGuard()));
  }

  await app.listen(3000);
}

bootstrap();
