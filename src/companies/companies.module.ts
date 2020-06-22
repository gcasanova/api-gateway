import { Module, HttpModule } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './models/companies.resolver';

@Module({
    imports: [HttpModule],
    providers: [CompaniesService, CompaniesResolver],
})
export class CompaniesModule {}
