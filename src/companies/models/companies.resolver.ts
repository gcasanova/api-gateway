import { Company } from './company.model'
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CompaniesService } from '../companies.service';

@Resolver(of => Company)
export class CompaniesResolver {
  constructor(
    private companiesService: CompaniesService,
  ) {}

  @Query(returns => Company, { name: 'company'})
  async getCompany(@Args('id') id: string) {
    const company = new Company();
    company.id = '4ba0b5f0-9906-11ea-bb37-0242ac130002';
    company.name = 'harmony';

    return company;
  }
}
