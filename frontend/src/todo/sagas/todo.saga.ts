import axios from 'axios';
import { takeLatest, put, select, all } from '@redux-saga/core/effects';
import { Todo, InputTypeTodo } from '../../shared/Todo';
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
} from '../actions/todo.actions';
import { ActionType } from 'typesafe-actions';
import { getToken } from '../../login/selectors/login.selector';
import update from 'immutability-helper';
import db from '../../db/db';
import {
  addChangeAction,
  onlineAction,
} from '../../changes/actions/changes.actions';

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
    if (e.message === 'Network Error') {
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

function* updateOnline(todo: Todo) {
  return (yield axios.put<Todo>(
    `${process.env.REACT_APP_SERVER}/todo/${todo.id}`,
    todo,
    {
      headers: {
        Authorization: `Bearer ${yield select(getToken)}`,
      },
    }
  )).data;
}

function* updateOffline(action: ActionType<typeof saveTodoAction>) {
  yield put(addChangeAction({ action }));
  db.table('todo').update(action.payload.id, action.payload);
  yield action.payload;
}

function* createOnline(todo: InputTypeTodo) {
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
    if (e.message === 'Network Error') {
      yield put(createTodoOfflineAction(todo));
    } else {
      yield put(saveTodoErrorAction(e.message));
    }
  }
  return;
}

function* createOffline(action: ActionType<typeof saveTodoAction>) {
  yield put(addChangeAction({ action }));
  const id = yield db.table('todo').add(action.payload);
  return update(action.payload, { id: { $set: id } }) as Todo;
}

function* save({ payload: todo }: ActionType<typeof saveTodoAction>) {
  if (todo.id) {
    yield put(updateTodoAction(todo as Todo));
  } else {
    yield put(createTodoAction(todo));
  }
  /*
  let responseTodo: Todo;
  if (action.payload.id) {
    try {
      responseTodo = yield updateOnline(action.payload as Todo);
      yield put(onlineAction());
    } catch (e) {
      if (e.message === 'Network Error') {
        responseTodo = yield updateOffline(action);
        console.log(responseTodo);
      } else {
        // @todo error action
        return;
      }
    }
  } else {
    try {
      responseTodo = yield createOnline(action.payload as InputTypeTodo);
      yield put(onlineAction());
    } catch (e) {
      if (e.message === 'Network Error') {
        responseTodo = yield createOffline(action);
      } else {
        // @todo error action
        return;
      }
    }
  }
  yield put(saveTodoSuccessAction(responseTodo));
  */
}

function* remove({ payload: todo }: ActionType<typeof deleteTodoAction>) {
  try {
    const token = yield select(getToken);
    yield axios.delete(`${process.env.REACT_APP_SERVER}/todo/${todo.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(onlineAction());
  } catch (e) {
    if (e.message === 'Network Error') {
      yield db.table('todo').delete(todo.id);
    } else {
      // @todo error action
      return;
    }
  }
  yield put(deleteTodoSuccessAction(todo));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_TODOS, loadTodos);
  yield takeLatest(SAVE_TODO, save);
  yield takeLatest(DELETE_TODO, remove);
  yield takeLatest(LOAD_TODOS_OFFLINE, loadOffline);
}
