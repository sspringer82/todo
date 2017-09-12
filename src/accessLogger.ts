import * as express from 'express';
import * as morgan from 'morgan';
import { createWriteStream } from 'fs';

const accessLogStream = createWriteStream('./logs/access.log', {
    flags: 'a'
});

export function attachAccessLogger(app: express.Application) {
    app.use(morgan('combined', { stream: accessLogStream }));
}
