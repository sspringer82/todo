import * as express from 'express';

import todoModel from './todo.model';

const controller = {
  async getAllAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Todo> {
    res.json(await todoModel.getAll());
  },
  getOneAction(req: express.Request, res: express.Response): void {},
  createAction(req: express.Request, res: express.Response): void {},
  updateAction(req: express.Request, res: express.Response): void {},
  deleteAction(req: express.Request, res: express.Response): void {},
};

export default controller;
