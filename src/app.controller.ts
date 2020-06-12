 
import { Controller, Request, Post, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public-endpoint.decorator';

@Controller()
export class AppController {
  
  @Public()
  @Get('healthcheck')
  async healthcheck() {
    // do some health check logic in here
    console.log('k8s probes');
  }
}
