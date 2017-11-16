import { Database, RunResult } from 'sqlite3';
import { DbApi } from '../shared/db-api';
import { List } from './../shared/list.type';
import { Todo } from './../shared/todo.type';

const db = new Database('db/database.sqlite3');
const todoAPI = new DbApi<Todo>(db);
const listAPI = new DbApi<List>(db);

const model = {
  getOne(id: number): Promise<Todo> {
    const query = `SELECT 
    t.id,
    t.title AS title,
    t.status,
    t.created,
    t.due,
    t.description,
    t.sequence,
    l.title as list
  FROM todo AS t 
  LEFT JOIN list AS l ON t.list = l.id
  WHERE t.id = ?
  ORDER BY t.sequence`;
    return todoAPI.get(query, [id]);
  },
  getAll(): Promise<Todo[]> {
    const query = `SELECT 
        t.id,
        t.title AS title,
        t.status,
        t.created,
        t.due,
        t.description,
        t.sequence,
        l.title as list
      FROM todo AS t 
      LEFT JOIN list AS l ON t.list = l.id
      ORDER BY t.sequence`;
    return todoAPI.all(query);
  },
  create(todo: Todo, userId: number): Promise<Todo> {
    const query = `INSERT INTO todo (
         title,
         status, 
         created, 
         list, 
         due, 
         description, 
         sequence
       ) VALUES (
         ?, 
         ?, 
         ?, 
         (SELECT id FROM list WHERE title = ? and owner = ?), 
         ?, 
         ?, 
         (SELECT MAX(sequence) +1 FROM todo WHERE list = (SELECT id FROM list WHERE title = ? and owner = ?)))`;
    return todoAPI
      .run(query, [
        todo.title,
        todo.status,
        todo.created,
        todo.list,
        userId,
        todo.due,
        todo.description,
        todo.list,
        userId,
      ])
      .then((data: RunResult) => this.getOne(data.lastID));
  },
  update(todo: Todo, userId: number): Promise<Todo> {
    const query = `UPDATE 
         todo 
       SET 
         title = ?, 
         status = ?, 
         list = (SELECT id FROM list WHERE title = ? and owner = ?), 
         due = ?, 
         description = ?, 
         sequence = ? 
       WHERE id = ?`;
    return todoAPI
      .run(query, [
        todo.title,
        todo.status,
        todo.list,
        userId,
        todo.due,
        todo.description,
        todo.sequence,
        todo.id,
      ])
      .then(() => todo);
  },
  delete(id: number): Promise<RunResult> {
    const query = 'DELETE FROM todo WHERE id = ?';
    return todoAPI.run(query, [id]);
  },
};

export default model;
