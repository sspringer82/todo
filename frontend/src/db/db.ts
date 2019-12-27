import Dexie from 'dexie';
import { Settings } from '../shared/Settings';
import { List } from '../shared/List';
import { InputTypeTodo } from '../shared/Todo';

export class TodoDatabase extends Dexie {
  settings: Dexie.Table<Settings, number> | undefined;
  list: Dexie.Table<List, number> | undefined;
  todo: Dexie.Table<InputTypeTodo, number> | undefined;
  changes: Dexie.Table<any, number> | undefined;

  constructor() {
    super('TodoDatabase');
    this.version(1).stores({
      settings: 'id++',
      list: 'id++, name',
      todo: 'id++, title',
      changes: 'id++',
    });
  }
}

export default new TodoDatabase();
