import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isAuthEnabled(): boolean {
    return this.configService.get<string>('AUTH_ENABLED', 'true') === 'true';
  }

  get getAppPort(): number {
    return Number(this.configService.get<number>('APP_PORT', 3000));
  }

  get getAuthSessionSecret(): string {
    return this.configService.get<string>('AUTH_SESSION_SECRET');
  }

  get getAuthSessionCookieName(): string {
    return this.configService.get<string>('AUTH_SESSION_COOKIE_NAME', 'sid');
  }

  get getAuthSessionCookieSecure(): boolean {
    return this.configService.get<string>('AUTH_SESSION_COOKIE_SECURE', 'true') === 'true';
  }

  get getAuthSessionCookieMaxAgeInMilliseconds(): number {
    return Number(this.configService.get<number>('AUTH_SESSION_COOKIE_MAX_AGE_MILLISECONS', 1800000));
  }

  get getLogLevel(): string {
    return this.configService.get<string>('LOG_LEVEL', 'info');
  }

  get getRedisDbNumberSessions(): number {
    return Number(this.configService.get<number>('REDIS_DB_NUMBER_SESSIONS'));
  }

  get getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }
}
