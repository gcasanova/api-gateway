import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private readonly reflector: Reflector,
		private readonly loginGuard: LoginGuard,
        private readonly authenticatedGuard: AuthenticatedGuard) {
	}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

		if (isPublic) {
			return true;
        }
        
        const isLogin = this.reflector.get<boolean>('isLogin', context.getHandler());

		if (isLogin) {
			return this.loginGuard.canActivate(context);
		}
		return this.authenticatedGuard.canActivate(context);
	}
}
