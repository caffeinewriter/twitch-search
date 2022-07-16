import Redis from 'ioredis';
import logger from './logger';

const redis = new Redis(process.env.REDIS_URL);

redis.on('error', (error) => {
  logger.error(error.message, {
    error,
    service: 'redis'
  })
})

export default redis;