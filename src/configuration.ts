import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    db: parseInt(process.env.REDIS_PREFIX, 10) || 0,
    // keyPrefix: parseInt(process.env.REDIS_PREFIX, 10) || 0,

    onClientReady: async (client: Redis) => {
      Logger.log('[Redis configuration] Redis initialized successfully');  

      await client.setex(
        `connection status:${new Date().toTimeString()}`,
        240,
        'ready',
      );

      client.on('error', (err) => {
        Logger.error({ message: 'Redis encountered an error : ', err });
      });
    },
  },
});
