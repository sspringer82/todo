import {
  loadTodosAction,
  LOAD_TODOS_ERROR,
  SAVE_TODO_ERROR,
  DELETE_TODO_ERROR,
  saveTodoAction,
  deleteTodoAction,
} from '../../todo/actions/todo.actions';
import { ActionType } from 'typesafe-actions';
import { takeLatest, put } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';
import {
  LOAD_LISTS_ERROR,
  SAVE_LIST_ERROR,
  DELETE_LIST_ERROR,
  loadListsAction,
  saveListAction,
  deleteListAction,
} from '../../list/actions/list.actions';
import {
  LOAD_SETTINGS_ERROR,
  SAVE_SETTINGS_ERROR,
  loadSettingsAction,
  saveSettingsAction,
} from '../../settings/actions/settings.actions';
import {
  CREATE_SUBTASK_ERROR,
  UPDATE_SUBTASK_ERROR,
  DELETE_SUBTASK_ERROR,
  createSubtaskAction,
  updateSubtaskAction,
  deleteSubtaskAction,
} from '../../todo/actions/subtask.actions';
import {
  LOAD_USERS_ERROR,
  loadUsersAction,
} from '../../user/actions/user.actions';
import { LOGIN_ERROR, loginAction } from '../../login/actions/login.actions';

function* redirectOn401({
  payload: error,
}: ActionType<
  | typeof loadTodosAction.failure
  | typeof loginAction.failure
  | typeof loadListsAction.failure
  | typeof saveListAction.failure
  | typeof deleteListAction.failure
  | typeof loadSettingsAction.failure
  | typeof saveSettingsAction.failure
  | typeof createSubtaskAction.failure
  | typeof updateSubtaskAction.failure
  | typeof deleteSubtaskAction.failure
  | typeof saveTodoAction.failure
  | typeof deleteTodoAction.failure
  | typeof loadUsersAction.failure
>) {
  if (error === 'Request failed with status code 401') {
    localStorage.removeItem('token');
    yield put(push('/'));
  }
}

export default function* errorSaga() {
  yield takeLatest(
    [
      LOAD_TODOS_ERROR,
      LOAD_LISTS_ERROR,
      SAVE_LIST_ERROR,
      DELETE_LIST_ERROR,
      LOAD_SETTINGS_ERROR,
      SAVE_SETTINGS_ERROR,
      CREATE_SUBTASK_ERROR,
      UPDATE_SUBTASK_ERROR,
      DELETE_SUBTASK_ERROR,
      LOAD_TODOS_ERROR,
      SAVE_TODO_ERROR,
      DELETE_TODO_ERROR,
      LOAD_USERS_ERROR,
      LOGIN_ERROR,
    ],
    redirectOn401
  );
}
