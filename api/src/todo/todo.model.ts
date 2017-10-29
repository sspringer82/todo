import { Todo } from './todo.type';

import { Database, RunResult } from 'sqlite3';
import { DbApi } from '../shared/db-api';

const db = new Database('db/database.sqlite3');
const dbAPI = new DbApi<Todo>(db);

const model = {
  getOne(id: number): Promise<Todo> {
    const query = 'SELECT * FROM todo WHERE id = ?';
    return dbAPI.get(query, [id]);
  },
  getAll(): Promise<Todo[]> {
    const query = 'SELECT * from todo';
    return dbAPI.all(query);
  },
  create(todo: Todo): Promise<Todo> {
    const query = 'INSERT INTO todo (title, status, created) VALUES (?, ?, ?)';
    return dbAPI
      .run(query, [todo.title, todo.status, todo.created])
      .then((data: RunResult) => ({ ...todo, id: data.lastID }));
  },
  update(todo: Todo): Promise<Todo> {
    const query = 'UPDATE todo SET title = ?, status = ? WHERE id = ?';
    return dbAPI
      .run(query, [todo.title, todo.status, todo.id])
      .then(() => todo);
  },
  delete(id: number): Promise<RunResult> {
    const query = 'DELETE FROM todo WHERE id = ?';
    return dbAPI.run(query, [id]);
  },
};

export default model;
