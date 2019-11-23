import { all } from '@redux-saga/core/effects';
import todoSaga from '../todo/sagas/todo.saga';

export default function* rootSaga() {
  yield all([todoSaga()]);
}
