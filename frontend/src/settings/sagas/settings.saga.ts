import axios from 'axios';

import { takeLatest, put, select, all } from '@redux-saga/core/effects';
import { getToken } from '../../login/selectors/login.selector';
import {
  LOAD_SETTINGS,
  SAVE_SETTINGS,
  loadSettingsSuccessAction,
  saveSettingsAction,
  saveSettingsSuccessAction,
  createSettingsAction,
  saveSettingsErrorAction,
  createSettingsOfflineAction,
  CREATE_SETTINGS,
  CREATE_SETTINGS_OFFLINE,
  updateSettingsAction,
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_OFFLINE,
  updateSettingsOfflineAction,
} from '../actions/settings.actions';
import { Settings } from '../../shared/Settings';
import { ActionType } from 'typesafe-actions';
import db from '../../db/db';
import update from 'immutability-helper';
import {
  onlineAction,
  addChangeAction,
} from '../../changes/actions/changes.actions';

function* loadSettings() {
  let settings: Settings;
  if (navigator.onLine) {
    const token = yield select(getToken);
    settings = (yield axios.get<Settings>(
      `${process.env.REACT_APP_SERVER}/settings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data;
  } else {
    settings = (yield db.table('settings').toArray()).pop();
  }
  yield put(loadSettingsSuccessAction(settings));
}

function* createOnline({
  payload: settings,
}: ActionType<typeof createSettingsAction>) {
  try {
    const token = yield select(getToken);
    const responseSettings = (yield axios.put<Settings>(
      `${process.env.REACT_APP_SERVER}/settings/${settings.id}`,
      settings,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data;
    yield all([
      put(onlineAction()),
      put(saveSettingsSuccessAction(responseSettings)),
    ]);
  } catch (e) {
    if (e.message === 'Network Error') {
      yield put(createSettingsOfflineAction(settings));
    } else {
      yield put(saveSettingsErrorAction(e.message));
    }
  }
}

function* updateOnline({
  payload: settings,
}: ActionType<typeof updateSettingsAction>) {
  try {
    const token = yield select(getToken);
    const responseSettings = (yield axios.put<Settings>(
      `${process.env.REACT_APP_SERVER}/settings/${settings.id}`,
      settings,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data;
    yield all([
      put(onlineAction()),
      put(saveSettingsSuccessAction(responseSettings)),
    ]);
  } catch (e) {
    if (e.message === 'Network Error') {
      yield put(updateSettingsOfflineAction(settings));
    } else {
      yield put(saveSettingsErrorAction(e.message));
    }
  }
}

function* createOffline(
  action: ActionType<typeof createSettingsOfflineAction>
) {
  const id = yield db.table('settings').add(action.payload);
  const responseSettings = update(action.payload, { id: { $set: id } });
  yield all([
    put(addChangeAction({ action })),
    put(saveSettingsSuccessAction(responseSettings)),
  ]);
}

function* updateOffline(
  action: ActionType<typeof createSettingsOfflineAction>
) {
  yield db.table('settings').update(action.payload.id, action.payload);
  const responseSettings = action.payload;
  yield all([
    put(addChangeAction({ action })),
    put(saveSettingsSuccessAction(responseSettings)),
  ]);
}

function* save({ payload: settings }: ActionType<typeof saveSettingsAction>) {
  if (settings.id) {
    yield put(updateSettingsAction(settings));
  } else {
    yield put(createSettingsAction(settings));
  }
}

export default function* todoSaga() {
  yield takeLatest(LOAD_SETTINGS, loadSettings);
  yield takeLatest(SAVE_SETTINGS, save);
  yield takeLatest(CREATE_SETTINGS, createOnline);
  yield takeLatest(CREATE_SETTINGS_OFFLINE, createOffline);
  yield takeLatest(UPDATE_SETTINGS, updateOnline);
  yield takeLatest(UPDATE_SETTINGS_OFFLINE, updateOffline);
}
