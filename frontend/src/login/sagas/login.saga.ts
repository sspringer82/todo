import { ActionType } from 'typesafe-actions';
import { takeLatest, put, all } from '@redux-saga/core/effects';
import {
  loginAction,
  loginSuccessAction,
  LOGIN,
  loginErrorAction,
} from '../actions/login.actions';
import axios from 'axios';
import { push } from 'connected-react-router';

function* login({ payload: user }: ActionType<typeof loginAction>) {
  try {
    const response = yield axios.post<string>(
      `${process.env.REACT_APP_SERVER}/auth/login`,
      user
    );
    yield all([put(loginSuccessAction(response.data)), put(push('/'))]);
  } catch (e) {
    yield put(loginErrorAction());
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, login);
}
