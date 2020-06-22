import { Injectable, HttpService } from '@nestjs/common';
import { Company } from './models/company.model';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class CompaniesService {
  constructor(private readonly httpService: HttpService) {}

  async findById(id: string): Promise<Company> {
    // TODO: Take domain, endpoint, etc from config file
    const response = await this.httpService.get(`http://localhost:3001/companies/${id}`).toPromise();
    return response.data;
  }
}