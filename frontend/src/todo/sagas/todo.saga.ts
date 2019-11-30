import axios, { AxiosResponse } from 'axios';
import { takeLatest, put } from '@redux-saga/core/effects';
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
} from '../actions/todo.actions';
import { ActionType } from 'typesafe-actions';

function* loadTodos() {
  const { data: todos } = yield axios.get<Todo[]>(
    `${process.env.REACT_APP_SERVER}/todo`
  );

  yield put(loadTodosSuccessAction(todos));
}

function* save({ payload: todo }: ActionType<typeof saveTodoAction>) {
  let response: AxiosResponse<Todo>;
  if (todo.id) {
    response = yield axios.put<Todo>(
      `${process.env.REACT_APP_SERVER}/todo/${todo.id}`,
      todo
    );
  } else {
    response = yield axios.post<Todo>(
      `${process.env.REACT_APP_SERVER}/todo/`,
      todo
    );
  }
  yield put(saveTodoSuccessAction(response.data));
}

function* remove({ payload: todo }: ActionType<typeof deleteTodoAction>) {
  yield axios.delete(`${process.env.REACT_APP_SERVER}/todo/${todo.id}`);
  yield put(deleteTodoSuccessAction(todo));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_TODOS, loadTodos);
  yield takeLatest(SAVE_TODO, save);
  yield takeLatest(DELETE_TODO, remove);
}
