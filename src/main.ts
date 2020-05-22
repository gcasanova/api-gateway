import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ApiConfigService } from './config/api-config.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfigService = app.get<ApiConfigService>(ApiConfigService);

  apiConfigService.isAuthEnabled ?
    app.useGlobalGuards(new AuthGuard(app.get(Reflector), new JwtAuthGuard(), new LocalAuthGuard())) :
    console.log('Authentication disabled!');

  await app.listen(apiConfigService.getAppPort);
}

bootstrap();
