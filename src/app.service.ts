import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    const redisConfigs = this.configService.get<string>('redis');

    console.log(redisConfigs);
  }

  setGreeting(): string {
    return 'Halo';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
