import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ApiConfigModule } from '../config/api-config.module';
import { ApiConfigService } from '../config/api-config.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ApiConfigModule,
    JwtModule.registerAsync({
      imports: [ApiConfigModule],
      useFactory: async (apiConfigService: ApiConfigService) => ({
        secret: apiConfigService.getAuthSecret,
        signOptions: { expiresIn: `${apiConfigService.getAuthTokenExpirationInSeconds}s` },
      }),
      inject: [ApiConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
