import * as express from 'express';
import { createServer } from 'spdy';
import { readFileSync } from 'fs';

const app: express.Application = express();
const options = {
    cert: readFileSync('./certs/certificate.pem'),
    key: readFileSync('./certs/key.pem')
};

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello Client');
});

const server = createServer(options, app);
server.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});
