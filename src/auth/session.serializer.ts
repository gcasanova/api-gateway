import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, id: string) => void): any {
    done(null, user.id);
  }

  async deserializeUser(id: any, done: (err: Error, user: User) => void): Promise<any> {
    const user = await this.usersService.findById(id);
    done(null, user);
  }
}
