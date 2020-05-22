import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  getCompany(): string {
    return 'Hello World!';
  }
}
