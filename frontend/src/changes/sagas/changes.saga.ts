import { ActionType } from 'typesafe-actions';
import {
  addChangeAction,
  ADD_CHANGE,
  CLEAR_CHANGES,
  ONLINE,
} from '../actions/changes.actions';
import axios from 'axios';

import { takeLatest, select, put } from '@redux-saga/core/effects';
import db from '../../db/db';
import { getToken } from '../../login/selectors/login.selector';

function* addChange({ payload: change }: ActionType<typeof addChangeAction>) {
  yield db.table('changes').add(change);
}

function* applyChanges() {
  const changes = yield db.table('changes').toArray();
  yield axios.post(`${process.env.REACT_APP_SERVER}/changes/`, changes, {
    headers: {
      Authorization: `Bearer ${yield select(getToken)}`,
    },
  });
  yield put(clearChanges());
}

function* clearChanges() {
  db.table('changes').clear();
}

export default function* changesSaga() {
  yield takeLatest(ONLINE, applyChanges);
  yield takeLatest(ADD_CHANGE, addChange);
  yield takeLatest(CLEAR_CHANGES, clearChanges);
}
