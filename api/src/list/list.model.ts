import { Database, RunResult } from 'sqlite3';
import { DbApi } from '../shared/db-api';
import { List } from './../shared/list.type';

const db = new Database('db/database.sqlite3');
const listAPI = new DbApi<List>(db);

const model = {
  getOne(id: number, userId: number): Promise<List> {
    const query = 'SELECT * FROM list WHERE id = ? AND owner = ?';
    return listAPI.get(query, [id, userId]);
  },
  getAll(userId: number): Promise<List[]> {
    const query = 'SELECT * FROM list WHERE owner = ?';
    return listAPI.all(query, [userId]);
  },
  create(list: List, userId: number): Promise<List> {
    const query = 'INSERT INTO list (title, owner) VALUES (?, ?)';
    return listAPI
      .run(query, [list.title, userId])
      .then((data: RunResult) => ({ ...list, id: data.lastID }));
  },
  update(list: List, userId: number): Promise<List> {
    const query = 'UPDATE list SET title = ?, owner = ? WHERE id = ?';
    return listAPI.run(query, [list.title, userId, list.id]).then(() => list);
  },
  delete(id: number, userId: number): Promise<RunResult> {
    const query = 'DELETE FROM list WHERE id = ? AND owner = ?';
    return listAPI.run(query, [id, userId]);
  },
};

export default model;
