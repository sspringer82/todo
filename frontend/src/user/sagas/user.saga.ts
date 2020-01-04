import { takeLatest, put, select } from '@redux-saga/core/effects';
import axios from 'axios';
import db from '../../db/db';

import { getToken } from '../../login/selectors/login.selector';
import { User } from '../../shared/User';
import { loadUsersSuccessAction, LOAD_USERS } from '../actions/user.actions';

function* loadUsers() {
  const token = yield select(getToken);
  let users: User[];
  if (navigator.onLine) {
    users = (yield axios.get<User[]>(`${process.env.REACT_APP_SERVER}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).data;
  } else {
    users = yield db.table('user').toArray();
  }

  yield put(loadUsersSuccessAction(users));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_USERS, loadUsers);
}
