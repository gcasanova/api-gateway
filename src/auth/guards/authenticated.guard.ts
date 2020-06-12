import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);

    const isAuthenticated = request.isAuthenticated();

    if (isAuthenticated) {
      request.session.touch();
    }

    return isAuthenticated;
  }
}
