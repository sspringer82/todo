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
import {
  addChangeAction,
  onlineAction,
} from '../../changes/actions/changes.actions';

function* loadTodos() {
  let todosWithSubtasks: Todo[] = [];
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
    todosWithSubtasks = todos.map((todo: Todo) => {
      if (todo.subtasks) {
        return todo;
      } else {
        return update(todo, { subtasks: { $set: [] } });
      }
    });
    yield put(onlineAction());
  } catch (e) {
    if (e.message === 'Network Error') {
      todosWithSubtasks = yield db.table('todo').toArray();
    }
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
  db.table('todo').update(action.payload.id, action.payload);
  yield action.payload;
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
}
