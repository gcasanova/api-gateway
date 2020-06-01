 
import { Controller, Request, Post, Get } from '@nestjs/common';
import { Login } from './auth/decorators/login-endpoint.decorator';
import { Public } from './auth/decorators/public-endpoint.decorator';

@Controller()
export class AppController {

  @Login()
  @Post('auth/login')
  async login(@Request() req) {
    return { user: req.user };
  }
  
  @Public()
  @Get('healthcheck')
  async healthcheck() {
    // do some health check logic in here
    console.log('k8s probes');
  }

  @Get('auth/authenticated')
  async test(@Request() req) {
    return { user: req.user };
  }
}
