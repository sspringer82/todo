import { ActionType } from 'typesafe-actions';
import {
  addChangeAction,
  ADD_CHANGE,
  APPLY_CHANGES,
  CLEAR_CHANGES,
} from '../actions/changes.actions';

import { takeLatest } from '@redux-saga/core/effects';
import db from '../../db/db';

function* addChange({ payload: change }: ActionType<typeof addChangeAction>) {
  yield db.table('changes').add(change);
}

function* applyChanges() {}

function* clearChanges() {}

export default function* changesSaga() {
  yield takeLatest(ADD_CHANGE, addChange);
  yield takeLatest(APPLY_CHANGES, applyChanges);
  yield takeLatest(CLEAR_CHANGES, clearChanges);
}
