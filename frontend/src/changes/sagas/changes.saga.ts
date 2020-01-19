import { ActionType } from 'typesafe-actions';
import {
  addChangeAction,
  ADD_CHANGE,
  CLEAR_CHANGES,
  ONLINE,
} from '../actions/changes.actions';

import { takeLatest } from '@redux-saga/core/effects';
import db from '../../db/db';

function* addChange({ payload: change }: ActionType<typeof addChangeAction>) {
  yield db.table('changes').add(change);
}

function* applyChanges() {}

function* clearChanges() {}

export default function* changesSaga() {
  yield takeLatest(ONLINE, applyChanges);
  yield takeLatest(ADD_CHANGE, addChange);
  yield takeLatest(CLEAR_CHANGES, clearChanges);
}
