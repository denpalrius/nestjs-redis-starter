import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { data } from './interfaces/data';

@Injectable()
export class AppService {
  client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getClient();
  }

  async setValue(data: data): Promise<{ status: string; data: data }> {
    if (!data && !data.key && !data.seconds && !data.value) {
      throw new UnprocessableEntityException('Invalid data values');
    }

    const status = await this.client.setex(data.key, data.seconds, data.value);

    return {
      status,
      data,
    };
  }

  async getValue(key: string): Promise<any> {
    if (!key) {
      throw new UnprocessableEntityException('Invalid key');
    }
    const value = await this.client.get(key);

    return value || new NotFoundException('Nothing is set for that key');
  }
}
