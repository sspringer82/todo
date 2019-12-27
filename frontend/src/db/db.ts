import Dexie from 'dexie';
import { Settings } from '../shared/Settings';
import { List } from '../shared/List';
import { Todo } from '../shared/Todo';

export class TodoDatabase extends Dexie {
  settings: Dexie.Table<Settings, number> | undefined;
  list: Dexie.Table<List, number> | undefined;
  todo: Dexie.Table<Todo, number> | undefined;
  changes: Dexie.Table<any, number> | undefined;

  constructor() {
    super('TodoDatabase');
    const db = this;
    db.version(1).stores({
      settings: 'id++',
      list: 'id++, name',
      todo: 'id++, title',
      changes: 'id++',
    });
  }
}

export default new TodoDatabase();
