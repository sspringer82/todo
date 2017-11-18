import * as express from 'express';
import { User } from './../shared/user.type';

import userModel from './user.model';

const controller = {
  async getAllAction(
    req: express.Request,
    res: express.Response,
  ): Promise<User[]> {
    const todos = await userModel.getAll();
    res.json(todos);
    return todos;
  },
  async getOneAction(
    req: express.Request,
    res: express.Response,
  ): Promise<User> {
    const id = parseInt(req.params.id, 10);
    const todo = await userModel.getOne(id);
    res.json(todo);
    return todo;
  },
  async createAction(
    req: express.Request,
    res: express.Response,
  ): Promise<User> {
    const todo = await userModel.create(req.body);
    res.json(todo);
    return todo;
  },
  async updateAction(
    req: express.Request,
    res: express.Response,
  ): Promise<User> {
    const todo = await userModel.update(req.body);
    res.json(todo);
    return todo;
  },
  async deleteAction(
    req: express.Request,
    res: express.Response,
  ): Promise<boolean> {
    const id = parseInt(req.params.id, 10);
    const result = await userModel.delete(id);
    res.json(true);
    return true;
  },
  async registerAction(
    req: express.Request,
    res: express.Response,
  ): Promise<User> {
    const data = { ...req.body, isAdmin: 0, isActive: 0 };
    const user = await userModel.create(data);
    res.json(user);
    return user;
  },
};

export default controller;
