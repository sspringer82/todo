import { createWriteStream } from 'fs';
import * as bunyan from 'bunyan';

const logFileStream = createWriteStream('./logs/app.log');

const logger = bunyan.createLogger({
    name: 'app',
    stream: logFileStream,
    level: 'debug'
});

export { logger };
