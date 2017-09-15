import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from './types/user';

export function initializePassport(app: express.Application) {
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
}
