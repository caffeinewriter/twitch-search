import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: 'search-stream',
  },
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'combined.log',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

logger.info('Logger instantiated');
logger.info(`LOG_LEVEL=${process.env.LOG_LEVEL}`);
logger.info(`NODE_ENV=${process.env.NODE_ENV}`);

export default logger;
