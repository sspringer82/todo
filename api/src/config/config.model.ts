import { Database, RunResult } from 'sqlite3';
import { DbApi } from '../shared/db-api';
import { Config } from './../shared/config.type';

const db = new Database('db/database.sqlite3');
const configAPI = new DbApi<Config>(db);

const model = {
  get(userId: number): Promise<Config> {
    const query = 'SELECT * FROM config WHERE user = ?';
    return configAPI.get(query, [userId]);
  },
  create(config: Config, userId: number): Promise<Config> {
    const query = 'INSERT INTO config (selectedList, user) VALUES (?, ?)';
    return configAPI
      .run(query, [config.selectedList, userId])
      .then((data: RunResult) => ({ ...config, id: data.lastID }));
  },
  update(config: Config, userId: number): Promise<Config> {
    const query = 'UPDATE config SET selectedList = ? WHERE user = ?';
    return configAPI
      .run(query, [config.selectedList, userId])
      .then(() => config);
  },
  delete(id: number, userId: number): Promise<RunResult> {
    const query = 'DELETE FROM config WHERE id = ? AND user = ?';
    return configAPI.run(query, [id, userId]);
  },
};

export default model;
