import { Reflector } from '@nestjs/core';
import { AuthenticatedGuard } from './authenticated.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private readonly reflector: Reflector,
		private readonly authenticatedGuard: AuthenticatedGuard) {
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

		if (isPublic) {
			return true;
		}

		return this.authenticatedGuard.canActivate(context);
	}
}
