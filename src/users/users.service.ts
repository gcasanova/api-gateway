import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { Company } from '../companies/models/company.model';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: '1',
        firstName: 'john',
        lastName: 'cena',
        email: 'john.cena@hotmail.com',
        password: 'changeme',
        company: new Company()
      },
      {
        id: '2',
        firstName: 'john',
        lastName: 'desayuna',
        email: 'john.desayuna@hotmail.com',
        password: 'changeme',
        company: new Company()
      },
      {
        id: '3',
        firstName: 'john',
        lastName: 'come',
        email: 'john.come@hotmail.com',
        password: 'changeme',
        company: new Company()
      },
    ];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}
