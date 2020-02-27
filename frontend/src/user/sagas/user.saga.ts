import { takeLatest, put, select, all } from '@redux-saga/core/effects';
import axios from 'axios';
import db from '../../db/db';

import { getToken } from '../../login/selectors/login.selector';
import { User } from '../../shared/User';
import {
  LOAD_USERS,
  LOAD_USERS_OFFLINE,
  loadUsersOfflineAction,
  loadUsersAction,
} from '../actions/user.actions';
import isNetworkError, {
  NETWORK_ERROR,
} from '../../shared/helpers/isNetworkError';
import { onlineAction } from '../../changes/actions/changes.actions';

function* load() {
  try {
    const response = yield axios.get<User[]>(
      `${process.env.REACT_APP_SERVER}/user`,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    );
    if (!response) {
      throw new Error(NETWORK_ERROR);
    }

    db.table('user').clear();
    db.table('user').bulkAdd(response.data);

    yield all([
      put(onlineAction()),
      put(loadUsersAction.success(response.data)),
    ]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(loadUsersOfflineAction());
    } else {
      yield put(loadUsersAction.failure(e.message));
    }
  }
}

function* loadOffline() {
  const users = yield db.table('user').toArray();
  yield put(loadUsersAction.success(users));
}

export default function* userSaga() {
  yield takeLatest(LOAD_USERS, load);
  yield takeLatest(LOAD_USERS_OFFLINE, loadOffline);
}
