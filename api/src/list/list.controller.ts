import * as express from 'express';

import { List } from '../shared/list.type';

import listModel from './list.model';

const controller = {
  async getAllAction(
    req: express.Request,
    res: express.Response,
  ): Promise<List[]> {
    const lists = await listModel.getAll(req.user.id);
    res.json(lists);
    return lists;
  },
  async getOneAction(
    req: express.Request,
    res: express.Response,
  ): Promise<List> {
    const id = parseInt(req.params.id, 10);
    const list = await listModel.getOne(id, req.user.id);
    res.json(list);
    return list;
  },
  async createAction(
    req: express.Request,
    res: express.Response,
  ): Promise<List> {
    const list = await listModel.create(req.body, req.user.id);
    res.json(list);
    return list;
  },
  async updateAction(
    req: express.Request,
    res: express.Response,
  ): Promise<List> {
    const list = await listModel.update(req.body, req.user.id);
    res.json(list);
    return list;
  },
  async deleteAction(
    req: express.Request,
    res: express.Response,
  ): Promise<boolean> {
    const id = parseInt(req.params.id, 10);
    const result = await listModel.delete(id, req.user.id);
    res.json(true);
    return true;
  },
};

export default controller;
