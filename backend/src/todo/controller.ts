import * as express from 'express';

const controller = {
  getAll(req: express.Request, res: express.Response) {
    this.render(req, res, 'Hello Express');
  },
  getById(req: express.Request, res: express.Response) {
    this.render(req, res, 'Hello Express');
  },
  create(req: express.Request, res: express.Response) {
    this.render(req, res, 'Hello Express');
  },
  update(req: express.Request, res: express.Response) {
    this.render(req, res, 'Hello Express');
  },
  delete(req: express.Request, res: express.Response) {
    this.render(req, res, 'Hello Express');
  },
  render(
    req: express.Request,
    res: express.Response,
    data: any,
    view: string = '',
  ) {
    if (req.accepts('json')) {
      res.json(data);
    } else {
      res.render(view);
    }
  },
};

export { controller };
