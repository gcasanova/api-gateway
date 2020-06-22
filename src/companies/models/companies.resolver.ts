import { Company } from './company.model'
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CompaniesService } from '../companies.service';

@Resolver(of => Company)
export class CompaniesResolver {
  constructor(
    private companiesService: CompaniesService,
  ) {}

  @Query(returns => Company, { name: 'company'})
  getCompany(@Args('id') id: string): Promise<Company> {
    return this.companiesService.findById(id);
  }
}
