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
    this.client = this.getRedisClient();
  }

  getRedisClient(): Redis {
    return this.redisService.getClient();
  }

  async setValue(data: data): Promise<{ status: string; data: data }> {
    if (!data && !data.key && !data.seconds && !data.value) {
      throw new UnprocessableEntityException('Invalid data values');
    }

    const value =
      typeof data.value === 'string' ? data.value : JSON.stringify(data.value);

    const status = await this.client.setex(data.key, data.seconds, value);

    return {
      status,
      data,
    };
  }

  async getValue(key: string): Promise<any> {
    const value = await this.client.get(key);

    if (!key || !value) {
      throw new UnprocessableEntityException('Invalid key or null value');
    }

    return { success: true, data: value };
  }
}
