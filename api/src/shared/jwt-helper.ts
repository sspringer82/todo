import * as express from 'express';
import * as jwt from 'express-jwt';

export default jwt({
  secret: 'secret',
});
