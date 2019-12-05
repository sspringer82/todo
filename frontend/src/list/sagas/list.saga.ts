import {
  LOAD_LISTS,
  loadListsSuccessAction,
  saveListAction,
  saveListSuccessAction,
  SAVE_LIST,
  deleteListAction,
  deleteListSuccessAction,
  DELETE_LIST,
} from '../actions/list.actions';
import { takeLatest, put, select } from '@redux-saga/core/effects';
import axios, { AxiosResponse } from 'axios';
import { getToken } from '../../login/selectors/login.selector';
import { List } from '../../shared/List';
import { ActionType } from 'typesafe-actions';

function* loadLists() {
  const token = yield select(getToken);
  const { data: lists } = yield axios.get<List[]>(
    `${process.env.REACT_APP_SERVER}/list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  yield put(loadListsSuccessAction(lists));
}

function* save({ payload: list }: ActionType<typeof saveListAction>) {
  const token = yield select(getToken);
  let response: AxiosResponse<List>;
  if (list.id) {
    response = yield axios.put<List>(
      `${process.env.REACT_APP_SERVER}/list/${list.id}`,
      list,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    response = yield axios.post<List>(
      `${process.env.REACT_APP_SERVER}/list/`,
      list,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  yield put(saveListSuccessAction(response.data));
}

function* remove({ payload: list }: ActionType<typeof deleteListAction>) {
  const token = yield select(getToken);
  yield axios.delete(`${process.env.REACT_APP_SERVER}/list/${list.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  yield put(deleteListSuccessAction(list));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_LISTS, loadLists);
  yield takeLatest(SAVE_LIST, save);
  yield takeLatest(DELETE_LIST, remove);
}
