import {
  loadListsAction,
  LOAD_LISTS_ERROR,
  saveListAction,
  SAVE_LIST_ERROR,
  deleteListAction,
  DELETE_LIST_ERROR,
} from '../../list/actions/list.actions';
import { ActionType } from 'typesafe-actions';
import update from 'immutability-helper';
import { activateErrorAction, ACTIVATE_ERROR } from '../actions/error.actions';
import { LOGIN_ERROR, loginAction } from '../../login/actions/login.actions';
import {
  loadSettingsAction,
  LOAD_SETTINGS_ERROR,
  saveSettingsAction,
  SAVE_SETTINGS_ERROR,
} from '../../settings/actions/settings.actions';
import {
  createSubtaskAction,
  CREATE_SUBTASK_ERROR,
  updateSubtaskAction,
  UPDATE_SUBTASK_ERROR,
  DELETE_SUBTASK_ERROR,
  deleteSubtaskAction,
} from '../../todo/actions/subtask.actions';
import {
  loadTodosAction,
  LOAD_TODOS_ERROR,
  saveTodoAction,
  SAVE_TODO_ERROR,
  deleteTodoAction,
  DELETE_TODO_ERROR,
} from '../../todo/actions/todo.actions';
import {
  loadUsersAction,
  LOAD_USERS_ERROR,
} from '../../user/actions/user.actions';

export interface State {
  currentError?: string | null;
  errors: string[];
}

const initialState: State = {
  errors: [],
};

export default function(
  state: State = initialState,
  action: ActionType<
    | typeof activateErrorAction
    | typeof loginAction.failure
    | typeof loadListsAction.failure
    | typeof saveListAction.failure
    | typeof deleteListAction.failure
    | typeof loadSettingsAction.failure
    | typeof saveSettingsAction.failure
    | typeof createSubtaskAction.failure
    | typeof updateSubtaskAction.failure
    | typeof deleteSubtaskAction.failure
    | typeof loadTodosAction.failure
    | typeof saveTodoAction.failure
    | typeof deleteTodoAction.failure
    | typeof loadUsersAction.failure
  >
) {
  switch (action.type) {
    case LOAD_LISTS_ERROR:
    case SAVE_LIST_ERROR:
    case DELETE_LIST_ERROR:
    case LOAD_SETTINGS_ERROR:
    case SAVE_SETTINGS_ERROR:
    case CREATE_SUBTASK_ERROR:
    case UPDATE_SUBTASK_ERROR:
    case DELETE_SUBTASK_ERROR:
    case LOAD_TODOS_ERROR:
    case SAVE_TODO_ERROR:
    case DELETE_TODO_ERROR:
    case LOAD_USERS_ERROR:
    case LOGIN_ERROR:
      if (state.currentError) {
        return update(state, { errors: { $push: [action.payload] } });
      } else {
        return update(state, { currentError: { $set: action.payload } });
      }
    case ACTIVATE_ERROR:
      const currentError = state.errors[0] || null;
      return update(state, {
        currentError: { $set: currentError },
        errors: {
          $splice: [[0, 1]],
        },
      });
    default:
      return state;
  }
}
