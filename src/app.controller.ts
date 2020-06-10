import { Controller, Get, Body, Query, Post, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { data } from './interfaces/data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    return { status: 'OK', message: 'This is a nest js redis starter' };
  }

  @Get('redis_client')
  getRedisClient() {
    const redisClient = this.appService.getRedisClient() as any;
    const { options, status } = redisClient;
    return { options, status };
  }

  @Post('set')
  async setValueInRedis(
    @Body() data: data,
  ): Promise<{ status: string; data: data }> {
    return await this.appService.setValue(data);
  }

  @Get('get')
  async getValueFromRedis(@Query('key') key: string): Promise<string> {
    return await this.appService.getValue(key);
  }
}
