import { Subtask } from '../../shared/Subtask';
import { ActionType } from 'typesafe-actions';
import {
  saveSubtaskAction,
  saveSubtaskSuccessAction,
  deleteSubtaskAction,
  deleteSubtaskSuccessAction,
  SAVE_SUBTASK,
  DELETE_SUBTASK,
} from '../actions/subtask.actions';
import { getToken } from '../../login/selectors/login.selector';
import axios, { AxiosResponse } from 'axios';
import { takeLatest, put, select } from '@redux-saga/core/effects';

function* save({ payload: subtask }: ActionType<typeof saveSubtaskAction>) {
  const token = yield select(getToken);
  let response: AxiosResponse<Subtask>;
  if (subtask.id) {
    response = yield axios.put<Subtask>(
      `${process.env.REACT_APP_SERVER}/subtask/${subtask.id}`,
      subtask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    response = yield axios.post<Subtask>(
      `${process.env.REACT_APP_SERVER}/subtask/`,
      subtask,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  yield put(saveSubtaskSuccessAction(response.data));
}

function* remove({ payload: subtask }: ActionType<typeof deleteSubtaskAction>) {
  const token = yield select(getToken);
  yield axios.delete(`${process.env.REACT_APP_SERVER}/subtask/${subtask.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  yield put(deleteSubtaskSuccessAction(subtask));
}

export default function* todoSaga() {
  yield takeLatest(SAVE_SUBTASK, save);
  yield takeLatest(DELETE_SUBTASK, remove);
}
