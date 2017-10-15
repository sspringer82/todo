import * as express from 'express';
import { Todo } from './todo.type';

import todoModel from './todo.model';

const controller = {
  async getAllAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Todo[]> {
    const todos = await todoModel.getAll();
    res.json(todos);
    return todos;
  },
  getOneAction(req: express.Request, res: express.Response): void {},
  createAction(req: express.Request, res: express.Response): void {},
  updateAction(req: express.Request, res: express.Response): void {},
  deleteAction(req: express.Request, res: express.Response): void {},
};

export default controller;
