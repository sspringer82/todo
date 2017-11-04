import * as express from 'express';
import { createServer } from 'spdy';
import * as bodyParser from 'body-parser';
import authRouter from './auth';
import todoRouter from './todo/router';
import listRouter from './list/router';
import userRouter from './user/router';

import { readFileSync } from 'fs';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', authRouter);
app.use('/todo', todoRouter);
app.use('/list', listRouter);
app.use('/user', userRouter);

const options = {
  cert: readFileSync('./certs/certificate.pem'),
  key: readFileSync('./certs/key.pem'),
};

const server = createServer(options, app);
server.listen(8080, () => {
  console.info('Server started');
});
