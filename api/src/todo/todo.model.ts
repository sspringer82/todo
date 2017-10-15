import { promisify } from 'util';
import { Status, Todo } from './todo.type';

import { Database, RunResult } from 'sqlite3';

const db = new Database('db/database.sqlite3');

const dbAPI = {
  all(sql: string): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },
  get(sql: string, params: any[]): Promise<Todo> {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  run(sql: string, params: any[]): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(this: RunResult, err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  },
};

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
      .then((data: RunResult) => {
        return { ...todo, id: data.lastID };
      });
  },
  update(todo: Todo): Promise<Todo> {
    const query = 'UPDATE todo SET title = ?, status = ? WHERE id = ?';
    return dbAPI.run(query, [todo.title, todo.status, todo.id]).then(() => {
      return todo;
    });
  },
  delete(id: number): Promise<RunResult> {
    const query = 'DELETE FROM todo WHERE id = ?';
    return dbAPI.run(query, [id]);
  },
};

export default model;
