import * as express from 'express';
import { createServer } from 'spdy';
import todoRouter from './todo/router';

import { readFileSync } from 'fs';

const app: express.Application = express();

app.use('/todo', todoRouter);

const options = {
  cert: readFileSync('./certs/certificate.pem'),
  key: readFileSync('./certs/key.pem'),
};

const server = createServer(options, app);
server.listen(8080, () => {
  console.info('Server started');
});
