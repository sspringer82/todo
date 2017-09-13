import * as express from 'express';
import { createServer } from 'spdy';
import { readFileSync } from 'fs';
import { attachAccessLogger } from './accessLogger';
import { logger } from './logger';
import * as helmet from 'helmet';

const app: express.Application = express();
const options = {
    cert: readFileSync('./certs/certificate.pem'),
    key: readFileSync('./certs/key.pem')
};
app.use(helmet());

app.use(express.static('/public'));
attachAccessLogger(app);

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello Client');
});

const server = createServer(options, app);
server.listen(8080, () => {
    logger.info('Server started');
});
