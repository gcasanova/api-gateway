import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './models/companies.resolver';

@Module({
    providers: [CompaniesService, CompaniesResolver],
})
export class CompaniesModule {}
