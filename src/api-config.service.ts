import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isAuthEnabled(): boolean {
    return this.configService.get<boolean>('AUTHENTICATION_ENABLED', true);
  }

  get getAppPort(): number {
    return this.configService.get<number>('APP_PORT', 3000);
  }
}
