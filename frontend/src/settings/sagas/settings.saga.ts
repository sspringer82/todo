import axios, { AxiosResponse } from 'axios';

import { takeLatest, put, select } from '@redux-saga/core/effects';
import { getToken } from '../../login/selectors/login.selector';
import {
  LOAD_SETTINGS,
  SAVE_SETTINGS,
  loadSettingsSuccessAction,
  saveSettingsAction,
  saveSettingsSuccessAction,
} from '../actions/settings.actions';
import { Settings } from '../../shared/Settings';
import { ActionType } from 'typesafe-actions';
import db from '../../db/db';
import update from 'immutability-helper';

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

function* save({ payload: settings }: ActionType<typeof saveSettingsAction>) {
  const token = yield select(getToken);
  let response: AxiosResponse<Settings>;
  let responseSettings: Settings;
  if (settings.id) {
    if (navigator.onLine) {
      responseSettings = (yield axios.put<Settings>(
        `${process.env.REACT_APP_SERVER}/settings/${settings.id}`,
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )).data;
    } else {
      yield db.table('settings').update(settings.id, settings);
      responseSettings = settings;
    }
  } else {
    if (navigator.onLine) {
      responseSettings = (yield axios.post<Settings>(
        `${process.env.REACT_APP_SERVER}/settings/`,
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )).data;
    } else {
      const id = yield db.table('settings').add(settings);
      responseSettings = update(settings, { id: { $set: id } });
    }
  }
  yield put(saveSettingsSuccessAction(responseSettings));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_SETTINGS, loadSettings);
  yield takeLatest(SAVE_SETTINGS, save);
}
