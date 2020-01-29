import { takeLatest, put, select, all } from '@redux-saga/core/effects';
import axios from 'axios';
import db from '../../db/db';

import { getToken } from '../../login/selectors/login.selector';
import { User } from '../../shared/User';
import {
  loadUsersSuccessAction,
  LOAD_USERS,
  LOAD_USERS_OFFLINE,
  loadUsersOfflineAction,
  loadUsersErrorAction,
} from '../actions/user.actions';
import isNetworkError from '../../shared/helpers/isNetworkError';
import { onlineAction } from '../../changes/actions/changes.actions';

function* loadUsers() {
  try {
    const token = yield select(getToken);
    const users = (yield axios.get<User[]>(
      `${process.env.REACT_APP_SERVER}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data;
    yield all([put(onlineAction()), put(loadUsersSuccessAction(users))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(loadUsersOfflineAction());
    } else {
      yield put(loadUsersErrorAction(e.message));
    }
  }
}

function* loadOffline() {
  const users = yield db.table('user').toArray();
  yield put(loadUsersSuccessAction(users));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_USERS, loadUsers);
  yield takeLatest(LOAD_USERS_OFFLINE, loadOffline);
}
