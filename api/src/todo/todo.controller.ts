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
  async getOneAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Todo> {
    const id = parseInt(req.params.id, 10);
    const todo = await todoModel.getOne(id);
    res.json(todo);
    return todo;
  },
  async createAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Todo> {
    console.log(req.body);
    const todo = await todoModel.create(req.body);
    res.json(todo);
    return todo;
  },
  updateAction(req: express.Request, res: express.Response): void {},
  deleteAction(req: express.Request, res: express.Response): void {},
};

export default controller;
