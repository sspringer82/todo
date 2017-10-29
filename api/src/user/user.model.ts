import { Database } from 'sqlite3';
import { DbApi } from '../shared/db-api';
import { User } from './user.type';
import { PassThrough } from 'stream';

const db = new Database('db/database.sqlite3');
const dbAPI = new DbApi<User>(db);

export const userModel = {
  getOneByCredentials(username: string, pasword: string): Promise<User> {
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
    return dbAPI.get(query, [username, pasword]);
  },
};
