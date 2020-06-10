import { Controller, Get, Body, Param, Query, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { data } from './interfaces/data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return 'This is a nest js redis starter';
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
