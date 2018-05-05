// @todo move back to import after winston has fixed typings
const winston = require('winston');

const logger = new winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/application.log' }),
  ],
});

export { logger };
