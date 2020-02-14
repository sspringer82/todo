import { ActionType } from 'typesafe-actions';
import {
  addChangeAction,
  ADD_CHANGE,
  CLEAR_CHANGES,
  ONLINE,
  clearChangesAction,
} from '../actions/changes.actions';
import axios from 'axios';

import { takeLatest, select, put } from '@redux-saga/core/effects';
import db from '../../db/db';
import { getToken } from '../../login/selectors/login.selector';

function* add({ payload: change }: ActionType<typeof addChangeAction>) {
  yield db.table('changes').add(change);
}

function* apply() {
  const changes = yield db.table('changes').toArray();
  if (changes.length > 0) {
    yield axios.post(`${process.env.REACT_APP_SERVER}/changes/`, changes, {
      headers: {
        Authorization: `Bearer ${yield select(getToken)}`,
      },
    });
  }
  yield put(clearChangesAction());
}

function* clear() {
  yield db.table('changes').clear();
}

export default function* changesSaga() {
  yield takeLatest(ONLINE, apply);
  yield takeLatest(ADD_CHANGE, add);
  yield takeLatest(CLEAR_CHANGES, clear);
}
