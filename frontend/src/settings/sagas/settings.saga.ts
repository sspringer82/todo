import axios from 'axios';

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

function* loadSettings() {
  const token = yield select(getToken);
  const { data: settings } = yield axios.get<Settings>(
    `${process.env.REACT_APP_SERVER}/settings`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  yield put(loadSettingsSuccessAction(settings));
}

function* save({ payload: settings }: ActionType<typeof saveSettingsAction>) {
  const token = yield select(getToken);
  const response = yield axios.post<Settings>(
    `${process.env.REACT_APP_SERVER}/settings/`,
    settings,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  yield put(saveSettingsSuccessAction(response.data));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_SETTINGS, loadSettings);
  yield takeLatest(SAVE_SETTINGS, save);
}
