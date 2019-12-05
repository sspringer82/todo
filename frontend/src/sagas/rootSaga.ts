import { all } from '@redux-saga/core/effects';
import todoSaga from '../todo/sagas/todo.saga';
import listSaga from '../list/sagas/list.saga';
import loginSaga from '../login/sagas/login.saga';

export default function* rootSaga() {
  yield all([todoSaga(), loginSaga(), listSaga()]);
}
