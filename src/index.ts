import * as express from 'express';
import { createServer } from 'spdy';
import { readFileSync } from 'fs';
import { attachAccessLogger } from './accessLogger';
import { logger } from './logger';
import * as helmet from 'helmet';
import { User } from './user';
import * as session from 'express-session';

import { ensureLoggedIn } from 'connect-ensure-login';

import * as passport from 'passport';
import { Strategy } from 'passport-local';

const app: express.Application = express();

passport.use(
    new Strategy((username, password, cb) => {
        if (username === 'admin' && password === 'test') {
            const user = new User(username, password);
            return cb(null, user);
        } else {
            cb(null, false);
        }
    })
);
passport.serializeUser((user: User, cb) => cb(null, user.name));
passport.deserializeUser((id, cb) => {
    const user = new User('admin', 'test');
    cb(null, user);
});
var sess = {
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUninitialized: false
};
app.use(session(sess));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const options = {
    cert: readFileSync('./certs/certificate.pem'),
    key: readFileSync('./certs/key.pem')
};

app.use(helmet());
app.use(express.static('./public'));

attachAccessLogger(app);

app.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/' }),
    (req: express.Request, res: express.Response) => {
        res.redirect('/secret');
    }
);

app.get('/logout', (req: express.Request, res: express.Response) => {
    req.logout();
    res.redirect('/');
});

app.get(
    '/secret',
    ensureLoggedIn(),
    (req: express.Request, res: express.Response) => {
        res.send('Hello Client');
    }
);

const server = createServer(options, app);
server.listen(8080, () => {
    logger.info('Server started');
});
