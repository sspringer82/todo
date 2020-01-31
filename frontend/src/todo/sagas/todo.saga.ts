import axios from 'axios';
import { takeLatest, put, select, all } from '@redux-saga/core/effects';
import { Todo } from '../../shared/Todo';
import {
  loadTodosSuccessAction,
  LOAD_TODOS,
  SAVE_TODO,
  saveTodoAction,
  saveTodoSuccessAction,
  deleteTodoAction,
  DELETE_TODO,
  deleteTodoSuccessAction,
  loadTodosErrorAction,
  LOAD_TODOS_OFFLINE,
  loadTodosOfflineAction,
  updateTodoAction,
  createTodoAction,
  createTodoOfflineAction,
  saveTodoErrorAction,
  updateTodoOfflineAction,
  CREATE_TODO,
  CREATE_TODO_OFFLINE,
  UPDATE_TODO,
  UPDATE_TODO_OFFLINE,
  deleteTodoErrorAction,
  deleteTodoOfflineAction,
  DELETE_TODO_OFFLINE,
} from '../actions/todo.actions';
import { ActionType } from 'typesafe-actions';
import { getToken } from '../../login/selectors/login.selector';
import update from 'immutability-helper';
import db from '../../db/db';
import {
  addChangeAction,
  onlineAction,
} from '../../changes/actions/changes.actions';
import isNetworkError from '../../shared/helpers/isNetworkError';

function* loadTodos() {
  try {
    const token = yield select(getToken);
    const { data: todos } = yield axios.get<Todo[]>(
      `${process.env.REACT_APP_SERVER}/todo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const todosWithSubtasks = todos.map((todo: Todo) => {
      if (todo.subtasks) {
        return todo;
      } else {
        return update(todo, { subtasks: { $set: [] } });
      }
    });
    yield all([
      put(onlineAction()),
      put(loadTodosSuccessAction(todosWithSubtasks)),
    ]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(loadTodosOfflineAction());
    } else {
      yield put(loadTodosErrorAction(e));
    }
  }
}

function* loadOffline() {
  const todosWithSubtasks = yield db.table('todo').toArray();
  yield put(loadTodosSuccessAction(todosWithSubtasks));
}

function* updateOnline({ payload: todo }: ActionType<typeof updateTodoAction>) {
  try {
    const responseTodo = (yield axios.put<Todo>(
      `${process.env.REACT_APP_SERVER}/todo/${todo.id}`,
      todo,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    )).data;
    yield all([put(onlineAction()), put(saveTodoSuccessAction(responseTodo))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(updateTodoOfflineAction(todo));
    } else {
      yield put(saveTodoErrorAction(e.message));
    }
  }
}

function* updateOffline(action: ActionType<typeof updateTodoOfflineAction>) {
  db.table('todo').update(action.payload.id, action.payload);
  yield all([
    put(addChangeAction({ action })),
    put(saveTodoSuccessAction(action.payload as Todo)),
  ]);
}

function* createOnline({ payload: todo }: ActionType<typeof createTodoAction>) {
  try {
    const responseTodo = (yield axios.post<Todo>(
      `${process.env.REACT_APP_SERVER}/todo/`,
      todo,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    )).data;
    yield all([put(onlineAction()), put(saveTodoSuccessAction(responseTodo))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(createTodoOfflineAction(todo));
    } else {
      yield put(saveTodoErrorAction(e.message));
    }
  }
}

function* createOffline(action: ActionType<typeof createTodoOfflineAction>) {
  const id = yield db.table('todo').add(action.payload);
  const responseTodo = update(action.payload, { id: { $set: id } }) as Todo;
  yield all([
    put(addChangeAction({ action })),
    put(saveTodoSuccessAction(responseTodo)),
  ]);
}

function* save({ payload: todo }: ActionType<typeof saveTodoAction>) {
  if (todo.id) {
    yield put(updateTodoAction(todo as Todo));
  } else {
    yield put(createTodoAction(todo));
  }
}

function* remove({ payload: todo }: ActionType<typeof deleteTodoAction>) {
  try {
    const token = yield select(getToken);
    yield axios.delete(`${process.env.REACT_APP_SERVER}/todo/${todo.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield all([put(onlineAction()), put(deleteTodoSuccessAction(todo))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(deleteTodoOfflineAction(todo));
    } else {
      yield put(deleteTodoErrorAction(e.message));
      return;
    }
  }
}

function* removeOffline({
  payload: todo,
}: ActionType<typeof deleteTodoOfflineAction>) {
  db.table('todo').delete(todo.id);
  yield put(deleteTodoSuccessAction(todo));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_TODOS, loadTodos);
  yield takeLatest(LOAD_TODOS_OFFLINE, loadOffline);
  yield takeLatest(SAVE_TODO, save);
  yield takeLatest(CREATE_TODO, createOnline);
  yield takeLatest(CREATE_TODO_OFFLINE, createOffline);
  yield takeLatest(UPDATE_TODO, updateOnline);
  yield takeLatest(UPDATE_TODO_OFFLINE, updateOffline);
  yield takeLatest(DELETE_TODO, remove);
  yield takeLatest(DELETE_TODO_OFFLINE, removeOffline);
}
