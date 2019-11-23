import axios from 'axios';
import { takeLatest, put } from '@redux-saga/core/effects';
import { Todo } from '../../shared/Todo';
import { loadTodosSuccessAction, LOAD_TODOS } from '../actions/todo.actions';

function* loadTodos() {
  const { data } = yield axios.get<Todo[]>(
    `${process.env.REACT_APP_SERVER}/todos`
  );
  yield put(loadTodosSuccessAction(data));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_TODOS, loadTodos);
}
