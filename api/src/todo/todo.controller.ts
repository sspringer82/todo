import * as express from 'express';
import { Todo } from './../shared/todo.type';
import { List } from './../shared/list.type';

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
    const todo = await todoModel.create(req.body, req.user.id);
    res.json(todo);
    return todo;
  },
  async updateAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Todo> {
    const todo = await todoModel.update(req.body, req.user.id);
    res.json(todo);
    return todo;
  },
  async deleteAction(
    req: express.Request,
    res: express.Response,
  ): Promise<boolean> {
    const id = parseInt(req.params.id, 10);
    const result = await todoModel.delete(id);
    res.json(true);
    return true;
  },
};

export default controller;
