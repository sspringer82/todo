import * as express from 'express';
import { Todo } from './todo.type';
import { List } from './list.type';

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
    const todo = await todoModel.create(req.body);
    res.json(todo);
    return todo;
  },
  async updateAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Todo> {
    const todo = await todoModel.update(req.body);
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
  async getListAction(
    req: express.Request,
    res: express.Response,
  ): Promise<List[]> {
    const lists = await todoModel.getLists(req.user.id);
    res.json(lists);
    return lists;
  },
};

export default controller;
