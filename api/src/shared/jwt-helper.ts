import * as express from 'express';
import * as expressJwt from 'express-jwt';

export const jwtHelper = expressJwt({
  secret: 'secret',
});
