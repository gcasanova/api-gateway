import { Module } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';

@Module({
    exports: [ApiConfigService],
    providers: [ApiConfigService]
})
export class ApiConfigModule {}
