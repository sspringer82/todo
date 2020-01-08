import axios from 'axios';
import { takeLatest, put, select } from '@redux-saga/core/effects';
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
} from '../actions/todo.actions';
import { ActionType } from 'typesafe-actions';
import { getToken } from '../../login/selectors/login.selector';
import update from 'immutability-helper';
import db from '../../db/db';
import { addChangeAction } from '../../changes/actions/changes.actions';

function* loadTodos() {
  let todosWithSubtasks: Todo[] = [];
  if (navigator.onLine) {
    const token = yield select(getToken);
    const { data: todos } = yield axios.get<Todo[]>(
      `${process.env.REACT_APP_SERVER}/todo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    todosWithSubtasks = todos.map((todo: Todo) => {
      if (todo.subtasks) {
        return todo;
      } else {
        return update(todo, { subtasks: { $set: [] } });
      }
    });
  } else {
    todosWithSubtasks = yield db.table('todo').toArray();
  }
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
  yield db.table('todo').update(action.payload.id, action.payload);
}

function* createOnline(todo: InputTypeTodo) {
  return (yield axios.post<Todo>(
    `${process.env.REACT_APP_SERVER}/todo/`,
    todo,
    {
      headers: {
        Authorization: `Bearer ${yield select(getToken)}`,
      },
    }
  )).data;
}

function* createOffline(action: ActionType<typeof saveTodoAction>) {
  yield put(addChangeAction({ action }));
  const id = yield db.table('todo').add(action.payload);
  return update(action.payload, { id: { $set: id } }) as Todo;
}

function* save(action: ActionType<typeof saveTodoAction>) {
  let responseTodo: Todo;
  if (action.payload.id) {
    if (navigator.onLine) {
      responseTodo = yield updateOnline(action.payload as Todo);
    } else {
      responseTodo = yield updateOffline(action);
    }
  } else {
    if (navigator.onLine) {
      responseTodo = yield createOnline(action.payload as InputTypeTodo);
    } else {
      responseTodo = yield createOffline(action);
    }
  }
  yield put(saveTodoSuccessAction(responseTodo));
}

function* remove({ payload: todo }: ActionType<typeof deleteTodoAction>) {
  if (navigator.onLine) {
    const token = yield select(getToken);
    yield axios.delete(`${process.env.REACT_APP_SERVER}/todo/${todo.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    yield db.table('todo').delete(todo.id);
  }
  yield put(deleteTodoSuccessAction(todo));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_TODOS, loadTodos);
  yield takeLatest(SAVE_TODO, save);
  yield takeLatest(DELETE_TODO, remove);
}
