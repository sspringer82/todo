import { Injectable } from '@nestjs/common';
import { TodoService } from '../todo/todo/todo.service';
import { SettingsService } from '../settings/settings/settings.service';
import { ListService } from '../todo/list/list.service';
import { SubtaskService } from '../todo/subtask/subtask.service';
import { Subtask } from '../todo/subtask/subtask.entity';
import { Todo } from '../todo/todo/todo.entity';
import { List } from '../todo/list/list.entity';
import { Settings } from '../settings/settings/settings.entity';

enum types {
  todo = 'todo',
  subtask = 'subtask',
  list = 'list',
  settings = 'settings',
}

interface Item {
  id: number;
  newId: number;
}

interface Action {
  type: string;
}

@Injectable()
export class ChangesService {
  private ids = {
    todo: [],
    subtask: [],
    list: [],
    settings: [],
  };

  constructor(
    private readonly todoService: TodoService,
    private readonly settingsService: SettingsService,
    private readonly listService: ListService,
    private readonly subtaskService: SubtaskService,
  ) {}

  async applyChanges(changes: any[], user: any) {
    return Promise.all(changes.map((change) => this.passChange(change, user)));
  }

  async passChange(change, user): Promise<Todo | Settings | List | Subtask> {
    const isCreate = this.isCreate(change.action);
    const type = this.getType(change.action);
    const offlineRecord = this.isCreatedOffline(change.action.payload.id, type);

    let id: number;
    if (isCreate) {
      id = change.action.payload.id;
      delete change.action.payload.id;
      change.action = this.addUser(change.action, user);
    } else if (!!offlineRecord) {
      change.action.payload.id = offlineRecord.newId;
    }

    let data: any;

    switch (change.action.type) {
      case 'CREATE_TODO_OFFLINE':
      case 'UPDATE_TODO_OFFLINE':
        data = await this.todoService.save(change.action.payload);
        break;
      case 'DELETE_TODO_OFFLINE':
        data = this.todoService.remove(id);
        break;
      case 'CREATE_SETTINGS_OFFLINE':
      case 'UPDATE_SETTINGS_OFFLINE':
        data = this.settingsService.save(change.action.payload);
        break;
      case 'CREATE_LIST_OFFLINE':
      case 'UPDATE_LIST_OFFLINE':
        data = this.listService.save(change.action.payload);
        break;
      case 'DELETE_LIST_OFFLINE':
        data = this.listService.remove(change.action.payload.id);
        break;
      case 'CREATE_SUBTASK_OFFLINE':
      case 'UPDATE_SUBTASK_OFFLINE':
        data = this.subtaskService.save(change.action.payload);
        break;
      case 'DELETE_SUBTASK_OFFLINE':
        data = this.subtaskService.remove(change.action.payload.id);
        break;
    }
    if (isCreate) {
      this.ids[type].push({ id, newId: data.id });
    }
    return data;
  }

  getType(action: Action) {
    return action.type.split('_')[1].toLowerCase() as types;
  }

  isCreatedOffline(id: number, type: types): Item | undefined {
    return this.ids[type].find((item) => item.id === id);
  }

  isCreate(action: Action) {
    return action.type.substr(0, 6) === 'CREATE';
  }

  addUser(action, user) {
    if (
      action.type === 'CREATE_TODO_OFFLINE' ||
      action.type === 'CREATE_LIST_OFFLINE'
    ) {
      action.payload.creator = user;
    }

    if (action.type === 'CREATE_SETTINGS_OFFLINE') {
      action.payload.user = user;
    }

    return action;
  }
}
