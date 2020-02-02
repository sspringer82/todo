import { Injectable } from '@nestjs/common';
import { TodoService } from 'src/todo/todo/todo.service';
import { SettingsService } from 'src/settings/settings/settings.service';
import { ListService } from 'src/todo/list/list.service';
import { SubtaskService } from 'src/todo/subtask/subtask.service';

@Injectable()
export class ChangesService {
  constructor(
    private readonly todoService: TodoService,
    private readonly settingsService: SettingsService,
    private readonly listService: ListService,
    private readonly subtaskService: SubtaskService
  ) {}

  applyChanges(changes: any[]) {
    changes.forEach(change => {
      this.passChange(change);
    });
  }

  passChange(change) {
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
