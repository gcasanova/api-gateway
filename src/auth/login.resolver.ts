import { AuthService } from '../auth/auth.service';
import { User } from './../users/models/user.model';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public-endpoint.decorator';

@Resolver()
export class LoginResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(returns => User)
  async login(@Args('email') email: string, @Args('password') password: string, @Context() context: any) {    
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return false;
    }

    const request = context.req;

    await new Promise((resolve, reject) =>
      request.logIn(user, err => (err ? reject(err) : resolve()))
    );

    return user;
  }
}
