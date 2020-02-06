import { ActionType } from 'typesafe-actions';
import { takeLatest, put, all } from '@redux-saga/core/effects';
import { loginAction, LOGIN } from '../actions/login.actions';
import axios from 'axios';
import { push } from 'connected-react-router';

function* login({ payload: user }: ActionType<typeof loginAction.request>) {
  try {
    const response = yield axios.post<string>(
      `${process.env.REACT_APP_SERVER}/auth/login`,
      user
    );
    yield all([put(loginAction.success(response.data)), put(push('/'))]);
  } catch (e) {
    yield put(loginAction.failure());
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
