import { User } from './user.model'
import { UsersService } from '../users.service';
import { Company } from '../../companies/models/company.model'
import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
  ) {}

  @Query(returns => User, { name: 'user'})
  async getUser(@Args('id') id: string) {
    const user = new User();
    user.id = '4ba0b5f0-9906-11ea-bb37-0242ac130003';
    user.firstName = 'guillermo';
    user.lastName = 'casanova';

    return user;
    //return this.usersService.findOneById(id);
  }

  @ResolveField('company', returns => Company)
  async getCompany(@Parent() user: User) {
    const company = new Company();
    company.id = '4ba0b5f0-9906-11ea-bb37-0242ac130004';
    company.name = 'harmony';

    return company;
    //return this.usersService.findAll({ authorId: id });
  }

/*   @Mutation()
  async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
    return this.postsService.upvoteById({ id: postId });
  } */
}
