import axios from 'axios';

import { takeLatest, put, select, all } from '@redux-saga/core/effects';
import { getToken } from '../../login/selectors/login.selector';
import {
  LOAD_SETTINGS,
  SAVE_SETTINGS,
  saveSettingsAction,
  createSettingsAction,
  createSettingsOfflineAction,
  CREATE_SETTINGS,
  CREATE_SETTINGS_OFFLINE,
  updateSettingsAction,
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_OFFLINE,
  updateSettingsOfflineAction,
  loadSettingsOfflineAction,
  LOAD_SETTINGS_OFFLINE,
  loadSettingsAction,
} from '../actions/settings.actions';
import { Settings } from '../../shared/Settings';
import { ActionType } from 'typesafe-actions';
import db from '../../db/db';
import update from 'immutability-helper';
import {
  onlineAction,
  addChangeAction,
} from '../../changes/actions/changes.actions';
import isNetworkError, {
  NETWORK_ERROR,
} from '../../shared/helpers/isNetworkError';

function* loadSettings() {
  try {
    const response = yield axios.get<Settings>(
      `${process.env.REACT_APP_SERVER}/settings`,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    );
    if (!response) {
      throw new Error(NETWORK_ERROR);
    }
    yield all([
      put(onlineAction()),
      put(loadSettingsAction.success(response.data)),
    ]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(loadSettingsOfflineAction());
    } else {
      yield put(loadSettingsAction.failure(e.message));
    }
  }
}

function* loadOffline() {
  const settings = (yield db.table('settings').toArray()).pop();
  yield put(loadSettingsAction.success(settings));
}

function* createOnline({
  payload: settings,
}: ActionType<typeof createSettingsAction>) {
  try {
    const response = yield axios.put<Settings>(
      `${process.env.REACT_APP_SERVER}/settings/${settings.id}`,
      settings,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    );
    if (!response) {
      throw new Error(NETWORK_ERROR);
    }
    yield all([
      put(onlineAction()),
      put(saveSettingsAction.success(response.data)),
    ]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(createSettingsOfflineAction(settings));
    } else {
      yield put(saveSettingsAction.failure(e.message));
    }
  }
}

function* updateOnline({
  payload: settings,
}: ActionType<typeof updateSettingsAction>) {
  try {
    const response = yield axios.put<Settings>(
      `${process.env.REACT_APP_SERVER}/settings/${settings.id}`,
      settings,
      {
        headers: {
          Authorization: `Bearer ${yield select(getToken)}`,
        },
      }
    );
    if (!response) {
      throw new Error(NETWORK_ERROR);
    }
    yield all([
      put(onlineAction()),
      put(saveSettingsAction.success(response.data)),
    ]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(updateSettingsOfflineAction(settings));
    } else {
      yield put(saveSettingsAction.failure(e.message));
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
    put(saveSettingsAction.success(responseSettings)),
  ]);
}

function* updateOffline(
  action: ActionType<typeof createSettingsOfflineAction>
) {
  yield db.table('settings').update(action.payload.id, action.payload);
  const responseSettings = action.payload;
  yield all([
    put(addChangeAction({ action })),
    put(saveSettingsAction.success(responseSettings)),
  ]);
}

function* save({
  payload: settings,
}: ActionType<typeof saveSettingsAction.request>) {
  if (settings.id) {
    yield put(updateSettingsAction(settings));
  } else {
    yield put(createSettingsAction(settings));
  }
}

export default function* todoSaga() {
  yield takeLatest(LOAD_SETTINGS, loadSettings);
  yield takeLatest(LOAD_SETTINGS_OFFLINE, loadOffline);
  yield takeLatest(SAVE_SETTINGS, save);
  yield takeLatest(CREATE_SETTINGS, createOnline);
  yield takeLatest(CREATE_SETTINGS_OFFLINE, createOffline);
  yield takeLatest(UPDATE_SETTINGS, updateOnline);
  yield takeLatest(UPDATE_SETTINGS_OFFLINE, updateOffline);
}
