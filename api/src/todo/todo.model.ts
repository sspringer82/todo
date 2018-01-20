import { Database, RunResult } from 'sqlite3';
import { DbApi } from '../shared/db-api';
import { List } from './../shared/list.type';
import { Todo } from './../shared/todo.type';
import { reorder } from './todo.helper';

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
    t.archived,
    l.title as list
  FROM todo AS t 
  LEFT JOIN list AS l ON t.list = l.id
  WHERE t.id = ?
  ORDER BY t.sequence`;
    return todoAPI.get(query, [id]);
  },
  getAll(list = ''): Promise<Todo[]> {
    const query = `SELECT 
        t.id,
        t.title AS title,
        t.status,
        t.created,
        t.due,
        t.description,
        t.sequence,
        t.archived,
        l.title as list
      FROM todo AS t 
      LEFT JOIN list AS l ON t.list = l.id
      WHERE t.archived = 0
      ${list ? ' AND l.title = ? ' : ''}
      ORDER BY t.sequence`;
    if (list) {
      return todoAPI.all(query, [list]);
    }
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
         sequence,
         archived
       ) VALUES (
         ?, 
         ?, 
         ?, 
         (SELECT id FROM list WHERE title = ? and owner = ?), 
         ?, 
         ?, 
         (SELECT IFNULL(MAX(sequence) + 1, 1) FROM todo WHERE list = (SELECT id FROM list WHERE title = ? and owner = ?)),
         ?)`;
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
        todo.archived,
      ])
      .then((data: RunResult) => this.getOne(data.lastID));
  },
  async update(todo: Todo, userId: number): Promise<Todo> {
    const oldTodo = await this.getOne(todo.id);

    if (oldTodo.list !== todo.list) {
      const query = `SELECT 
        IFNULL(MAX(sequence) + 1, 0) 
      FROM todo 
      WHERE list = (SELECT id FROM list WHERE title = ? and owner = ?)`;
      const sequence = await todoAPI.get(query, [todo.list, userId]);
      todo.sequence = sequence.sequence + 1;
    }

    const query = `UPDATE 
         todo 
       SET 
         title = ?, 
         status = ?, 
         list = (SELECT id FROM list WHERE title = ? and owner = ?), 
         due = ?, 
         description = ?, 
         sequence = ?,
         archived = ?
       WHERE id = ?`;
    await todoAPI.run(query, [
      todo.title,
      todo.status,
      todo.list,
      userId,
      todo.due,
      todo.description,
      todo.sequence,
      todo.archived,
      todo.id,
    ]);
    await reorder(todo.list, userId);
    if (oldTodo.list !== todo.list) {
      await reorder(oldTodo.list, userId);
    }
    return todo;
  },
  async delete(id: number, userId: number): Promise<void> {
    const todo = await this.getOne(id);

    const query = 'DELETE FROM todo WHERE id = ?';
    await todoAPI.run(query, [id]);
    await reorder(todo.list, userId);
  },
};

export default model;
