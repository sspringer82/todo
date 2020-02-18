import { all } from '@redux-saga/core/effects';
import todoSaga from '../todo/sagas/todo.saga';
import subtaskSaga from '../todo/sagas/subtask.saga';
import listSaga from '../list/sagas/list.saga';
import loginSaga from '../login/sagas/login.saga';
import userSaga from '../user/sagas/user.saga';
import settingsSaga from '../settings/sagas/settings.saga';
import changesSaga from '../changes/sagas/changes.saga';
import errorSaga from '../error/sagas/error.saga';

export default function* rootSaga() {
  yield all([
    todoSaga(),
    loginSaga(),
    listSaga(),
    userSaga(),
    subtaskSaga(),
    settingsSaga(),
    changesSaga(),
    errorSaga(),
  ]);
}
