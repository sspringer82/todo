import * as express from 'express';

import { Config } from '../shared/config.type';

import { model as configModel } from './config.model';

export const controller = {
  async getAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Config> {
    const config = await configModel.get(req.user.id);
    res.json(config);
    return config;
  },
  async createAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Config> {
    const config = await configModel.create(req.body, req.user.id);
    res.json(config);
    return config;
  },
  async updateAction(
    req: express.Request,
    res: express.Response,
  ): Promise<Config> {
    const config = await configModel.update(req.body, req.user.id);
    res.json(config);
    return config;
  },
  async deleteAction(
    req: express.Request,
    res: express.Response,
  ): Promise<boolean> {
    const id = parseInt(req.params.id, 10);
    const result = await configModel.delete(id, req.user.id);
    res.json(true);
    return true;
  },
};
