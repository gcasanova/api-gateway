import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isAuthEnabled(): boolean {
    return this.configService.get<boolean>('AUTH_ENABLED', true);
  }

  get getAppPort(): number {
    return this.configService.get<number>('APP_PORT', 3000);
  }

  get getAuthSecret(): string {
    return this.configService.get<string>('AUTH_SECRET');
  }

  get getAuthTokenExpirationInSeconds(): number {
    return this.configService.get<number>('AUTH_TOKEN_EXPIRATION_SECONDS', 1800);
  }

  get getLogLevel(): string {
    return this.configService.get<string>('LOG_LEVEL', 'info');
  }
}
