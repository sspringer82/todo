import { Subtask } from '../../shared/Subtask';
import { ActionType } from 'typesafe-actions';
import {
  saveSubtaskAction,
  deleteSubtaskAction,
  SAVE_SUBTASK,
  DELETE_SUBTASK,
  UPDATE_SUBTASK_SUCCESS,
  CREATE_SUBTASK_SUCCESS,
  DELETE_SUBTASK_SUCCESS,
  createSubtaskAction,
  updateSubtaskAction,
  createSubtaskOfflineAction,
  CREATE_SUBTASK,
  CREATE_SUBTASK_OFFLINE,
  updateSubtaskOfflineAction,
  UPDATE_SUBTASK,
  UPDATE_SUBTASK_OFFLINE,
  deleteSubtaskOfflineAction,
  DELETE_SUBTASK_OFFLINE,
} from '../actions/subtask.actions';
import { getToken } from '../../login/selectors/login.selector';
import axios from 'axios';
import { takeLatest, put, select, all } from '@redux-saga/core/effects';
import { getTodo } from '../selectors/todo.selector';
import { saveTodoAction } from '../actions/todo.actions';
import update from 'immutability-helper';
import { Todo } from '../../shared/Todo';
import db from '../../db/db';
import isNetworkError, {
  NETWORK_ERROR,
} from '../../shared/helpers/isNetworkError';
import {
  onlineAction,
  addChangeAction,
} from '../../changes/actions/changes.actions';

function* save({ payload: subtask }: ActionType<typeof saveSubtaskAction>) {
  if (subtask.id) {
    yield put(updateSubtaskAction.request(subtask as Subtask));
  } else {
    yield put(createSubtaskAction.request(subtask));
  }
}

function* createOnline({
  payload: subtask,
}: ActionType<typeof createSubtaskAction.request>) {
  try {
    const response = yield axios.post<Subtask>(
      `${process.env.REACT_APP_SERVER}/subtask/`,
      subtask,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    );
    if (!response) {
      throw new Error(NETWORK_ERROR);
    }
    yield all([
      put(onlineAction()),
      put(createSubtaskAction.success(response.data)),
    ]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(createSubtaskOfflineAction(subtask));
    } else {
      yield put(createSubtaskAction.failure(e.message));
    }
  }
}

function* createOffline(action: ActionType<typeof createSubtaskOfflineAction>) {
  const id = action.payload.todo.id
    ? action.payload.todo.id
    : action.payload.todo;
  const todo = yield db.table('todo').get(id);
  const subtaskIndex =
    (id as number) * 1000 +
    Math.max.apply(
      null,
      todo.subtasks.map((st: Subtask) => st.id)
    ) +
    1;
  const responseSubtask = update(action.payload, {
    id: { $set: subtaskIndex },
  });
  db.table('todo').update(
    id,
    update(todo, { subtasks: { $push: [responseSubtask] } })
  );
  yield all([
    put(addChangeAction({ action })),
    put(createSubtaskAction.success(responseSubtask as Subtask)),
  ]);
}

function* updateOnline({
  payload: subtask,
}: ActionType<typeof updateSubtaskAction.request>) {
  try {
    const response = yield axios.put<Subtask>(
      `${process.env.REACT_APP_SERVER}/subtask/${subtask.id}`,
      subtask,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    );
    if (!response) {
      throw new Error(NETWORK_ERROR);
    }
    yield all([
      put(onlineAction()),
      put(createSubtaskAction.success(response.data)),
    ]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(updateSubtaskOfflineAction(subtask));
    } else {
      yield put(updateSubtaskAction.failure(e.message));
    }
  }
}

function* updateOffline(action: ActionType<typeof updateSubtaskOfflineAction>) {
  const id = action.payload.todo.id
    ? action.payload.todo.id
    : action.payload.todo;
  const todo = yield db.table('todo').get(id);
  const subtaskIndex = todo.subtasks.findIndex(
    (st: Subtask) => st.id === action.payload.id
  );
  db.table('todo').update(
    id,
    update(todo, { subtasks: { [subtaskIndex]: { $set: action.payload } } })
  );
  yield all([
    put(addChangeAction({ action })),
    put(createSubtaskAction.success(action.payload)),
  ]);
}

function* remove({
  payload: subtask,
}: ActionType<typeof deleteSubtaskAction.request>) {
  try {
    const response = yield axios.delete(
      `${process.env.REACT_APP_SERVER}/subtask/${subtask.id}`,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    );
    if (!response) {
      throw new Error(NETWORK_ERROR);
    }
    yield all([put(onlineAction()), put(deleteSubtaskAction.success(subtask))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(deleteSubtaskOfflineAction(subtask));
    } else {
      yield put(deleteSubtaskAction.failure(e.message));
    }
  }
}

function* removeOffline(action: ActionType<typeof deleteSubtaskOfflineAction>) {
  const id = action.payload.todo.id
    ? action.payload.todo.id
    : action.payload.todo;
  const todo = yield db.table('todo').get(id);
  const subtaskIndex = todo.subtasks.findIndex(
    (st: Subtask) => st.id === action.payload.id
  );
  db.table('todo').update(
    id,
    update(todo, { subtasks: { $splice: [[subtaskIndex, 1]] } })
  );
  yield put(deleteSubtaskAction.success(action.payload));
}

function* toggleTodoStatusDependingOnSubtasks({
  payload: subtask,
  type,
}: ActionType<
  | typeof updateSubtaskAction.success
  | typeof createSubtaskAction.success
  | typeof deleteSubtaskAction.success
>) {
  let id: Todo | number = subtask.todo;
  if (typeof id !== 'number' && subtask.todo.id) {
    id = subtask.todo.id;
  }
  const todo = yield select(getTodo(id as number));
  const subtasks = todo.subtasks;
  const subtaskIndex = subtasks.findIndex(
    (st: Subtask) => st.id === subtask.id
  );

  if (type === CREATE_SUBTASK_SUCCESS && subtaskIndex === -1) {
    subtasks.push(subtask);
  } else if (type === UPDATE_SUBTASK_SUCCESS && subtaskIndex > -1) {
    subtasks[subtaskIndex] = subtask;
  } else if (type === DELETE_SUBTASK_SUCCESS && subtaskIndex > -1) {
    subtasks.splice(subtaskIndex, 1);
    if (subtasks.length === 0) {
      return;
    }
  }
  const allDone = subtasks.every((st: Subtask) => st.done);

  yield put(saveTodoAction.request(update(todo, { done: { $set: allDone } })));
}

export default function* subtaskSaga() {
  yield takeLatest(SAVE_SUBTASK, save);
  yield takeLatest(DELETE_SUBTASK, remove);
  yield takeLatest(DELETE_SUBTASK_OFFLINE, removeOffline);
  yield takeLatest(CREATE_SUBTASK, createOnline);
  yield takeLatest(CREATE_SUBTASK_OFFLINE, createOffline);
  yield takeLatest(UPDATE_SUBTASK, updateOnline);
  yield takeLatest(UPDATE_SUBTASK_OFFLINE, updateOffline);
  yield takeLatest(
    [UPDATE_SUBTASK_SUCCESS, CREATE_SUBTASK_SUCCESS, DELETE_SUBTASK_SUCCESS],
    toggleTodoStatusDependingOnSubtasks
  );
}
