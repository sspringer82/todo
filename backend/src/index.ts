import * as express from 'express';
import { createServer } from 'spdy';
import { readFileSync } from 'fs';
import { attachAccessLogger } from './accessLogger';
import { logger } from './logger';
import * as helmet from 'helmet';

import { initializePassport } from './passport';
import * as passport from 'passport';

import { ensureLoggedIn } from 'connect-ensure-login';

import { router as todoRouter } from './todo/router';

const app: express.Application = express();
app.set('view engine', 'ejs');
initializePassport(app);
const options = {
  cert: readFileSync('./certs/certificate.pem'),
  key: readFileSync('./certs/key.pem'),
};

app.use(helmet());
app.use(express.static('./public'));

attachAccessLogger(app);

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req: express.Request, res: express.Response) => {
    res.redirect('/secret');
  },
);

app.get('/logout', (req: express.Request, res: express.Response) => {
  req.logout();
  res.redirect('/');
});

app.get(
  '/secret',
  ensureLoggedIn({ redirectTo: '/' }),
  (req: express.Request, res: express.Response) => {
    res.send('Hello Client');
  },
);

app.use('/todo', ensureLoggedIn({ redirectTo: '/' }), todoRouter);

const server = createServer(options, app);
server.listen(8080, () => {
  logger.info('Server started');
});
