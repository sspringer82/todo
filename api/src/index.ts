import * as express from 'express';
import { createServer } from 'spdy';
import * as bodyParser from 'body-parser';
import { router as authRouter } from './auth';
import { router as todoRouter } from './todo/router';
import { router as listRouter } from './list/router';
import { router as userRouter } from './user/router';
import { logger } from './shared/logger';

import { readFileSync } from 'fs';

process.on('unhandledRejection', e => console.log(e));

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('static', express.static('public'));
app.use('/login', authRouter);
app.use('/todo', todoRouter);
app.use('/list', listRouter);
app.use('/user', userRouter);
app.use(
  (err: any, req: express.Request, res: express.Response, next: Function) => {
    res.redirect('/');
  },
);

const options = {
  cert: readFileSync('./certs/certificate.pem'),
  key: readFileSync('./certs/key.pem'),
};

const server = createServer(options, app);
server.listen(8080, () => {
  logger.info('Server started');
});
