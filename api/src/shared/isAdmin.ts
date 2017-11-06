import * as Express from 'express';

export const isAdmin = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.statusCode = 403;
    res.end();
  }
};
