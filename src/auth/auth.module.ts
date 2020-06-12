import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { LoginResolver } from './login.resolver';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LoginResolver, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
