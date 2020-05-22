import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CompaniesModule } from './../companies/companies.module';
import { UsersResolver } from './models/users.resolver';

@Module({
    imports: [CompaniesModule],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
