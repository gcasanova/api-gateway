import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
        private readonly reflector: Reflector,
        private readonly jwtAuthGuard: JwtAuthGuard,
        private readonly localAuthGuard: LocalAuthGuard) {
	}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

		if (isPublic) {
			return true;
        }
        
        const isLogin = this.reflector.get<boolean>('isLogin', context.getHandler());

		if (isLogin) {
			return this.localAuthGuard.canActivate(context);
		}
		return this.jwtAuthGuard.canActivate(context);
	}
}
