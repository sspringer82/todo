import { Injectable } from '@nestjs/common';
import { TodoService } from '../todo/todo/todo.service';
import { SettingsService } from '../settings/settings/settings.service';
import { ListService } from '../todo/list/list.service';
import { SubtaskService } from '../todo/subtask/subtask.service';
import { Subtask } from '../todo/subtask/subtask.entity';
import { Todo } from '../todo/todo/todo.entity';
import { List } from '../todo/list/list.entity';
import { Settings } from '../settings/settings/settings.entity';

@Injectable()
export class ChangesService {
  constructor(
    private readonly todoService: TodoService,
    private readonly settingsService: SettingsService,
    private readonly listService: ListService,
    private readonly subtaskService: SubtaskService
  ) {}

  applyChanges(changes: any[]) {
    return Promise.all(changes.map(change => this.passChange(change)));
  }

  passChange(change): Promise<Todo | Settings | List | Subtask> {
    switch (change.action.type) {
      case 'CREATE_TODO_OFFLINE':
      case 'UPDATE_TODO_OFFLINE':
        return this.todoService.save(change.action.payload);
      case 'DELETE_TODO_OFFLINE':
        return this.todoService.remove(change.action.payload.id);
      case 'CREATE_SETTINGS_OFFLINE':
      case 'UPDATE_SETTINGS_OFFLINE':
        return this.settingsService.save(change.action.payload);
      case 'CREATE_LIST_OFFLINE':
      case 'UPDATE_LIST_OFFLINE':
        return this.listService.save(change.action.payload);
      case 'DELETE_LIST_OFFLINE':
        return this.listService.remove(change.action.payload.id);
      case 'CREATE_SUBTASK_OFFLINE':
      case 'UPDATE_SUBTASK_OFFLINE':
        return this.subtaskService.save(change.action.payload);
      case 'DELETE_SUBTASK_OFFLINE':
        return this.subtaskService.remove(change.action.payload.id);
    }
  }
}
