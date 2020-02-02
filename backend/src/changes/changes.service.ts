import { Injectable } from '@nestjs/common';
import { TodoService } from 'src/todo/todo/todo.service';
import { SettingsService } from 'src/settings/settings/settings.service';
import { ListService } from 'src/todo/list/list.service';
import { SubtaskService } from 'src/todo/subtask/subtask.service';
import { Subtask } from 'src/todo/subtask/subtask.entity';
import { Todo } from 'src/todo/todo/todo.entity';
import { List } from 'src/todo/list/list.entity';
import { Settings } from 'src/settings/settings/settings.entity';

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
    switch (change.type) {
      case 'CREATE_TODO':
      case 'UPDATE_TODO':
        return this.todoService.save(change.payload);
      case 'DELETE_TODO':
        return this.todoService.remove(change.payload.id);
      case 'CREATE_SETTINGS':
      case 'UPDATE_SETTINGS':
        return this.settingsService.save(change.payload);
      case 'CREATE_LIST':
      case 'UPDATE_LIST':
        return this.listService.save(change.payload);
      case 'DELETE_LIST':
        return this.listService.remove(change.payload.id);
      case 'CREATE_SUBTASK':
      case 'UPDATE_SUBTASK':
        return this.subtaskService.save(change.payload);
      case 'DELETE_SUBTASK':
        return this.subtaskService.remove(change.payload.id);
    }
  }
}
