import { Database, RunResult } from 'sqlite3';
import { DbApi } from '../shared/db-api';
import { User } from '../shared/user.type';
import { PassThrough } from 'stream';
import listModel from '../list/list.model';

const db = new Database('db/database.sqlite3');
const dbAPI = new DbApi<User>(db);

const userModel = {
  getOneByCredentials(username: string, pasword: string): Promise<User> {
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    return dbAPI.get(query, [username, pasword]);
  },
  getOne(id: number): Promise<User> {
    const query =
      'SELECT id, username, isActive, isAdmin FROM todo WHERE id = ?';
    return dbAPI.get(query, [id]);
  },
  getAll(): Promise<User[]> {
    const query = 'SELECT id, username, isActive, isAdmin FROM user';
    return dbAPI.all(query);
  },
  create(user: User): Promise<User> {
    const query =
      'INSERT INTO user (username, password, isActive, isAdmin) VALUES (?, ?, ?, ?)';
    return dbAPI
      .run(query, [user.username, user.password, user.isActive, user.isAdmin])
      .then((data: RunResult) => {
        return new Promise<User>((resolve, reject) => {
          const newUser = { ...user, id: data.lastID };
          listModel
            .create(
              { id: 0, title: 'default', owner: data.lastID },
              data.lastID,
            )
            .then(() => {
              resolve(newUser);
            });
        });
      });
  },
  update(user: User): Promise<User> {
    let result;
    if (
      user.hasOwnProperty('password') &&
      user.password !== undefined &&
      user.password !== ''
    ) {
      const query =
        'UPDATE user SET username = ?, password = ?, isAdmin = ?, isActive = ? WHERE id = ?';
      result = dbAPI.run(query, [
        user.username,
        user.password,
        user.isAdmin,
        user.isActive,
        user.id,
      ]);
    } else {
      const query =
        'UPDATE user SET username = ?, isAdmin = ?, isActive = ? WHERE id = ?';
      result = dbAPI.run(query, [
        user.username,
        user.isAdmin,
        user.isActive,
        user.id,
      ]);
    }
    return result.then(() => user);
  },
  delete(id: number): Promise<RunResult> {
    const query = 'DELETE FROM user WHERE id = ?';
    return dbAPI.run(query, [id]);
  },
};

export default userModel;
