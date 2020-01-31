import { ActionType } from 'typesafe-actions';
import {
  createTodoOfflineAction,
  updateTodoOfflineAction,
} from '../todo/actions/todo.actions';
import {
  createListOfflineAction,
  updateListOfflineAction,
} from '../list/actions/list.actions';
import { createSettingsOfflineAction } from '../settings/actions/settings.actions';
import {
  createSubtaskOfflineAction,
  updateSubtaskOfflineAction,
} from '../todo/actions/subtask.actions';

export interface Change {
  action:
    | ActionType<typeof createListOfflineAction>
    | ActionType<typeof updateListOfflineAction>
    | ActionType<typeof createSettingsOfflineAction>
    | ActionType<typeof createSettingsOfflineAction>
    | ActionType<typeof createSubtaskOfflineAction>
    | ActionType<typeof updateSubtaskOfflineAction>
    | ActionType<typeof createTodoOfflineAction>
    | ActionType<typeof updateTodoOfflineAction>;
}
