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
import axios from 'axios';
import { getToken } from '../../login/selectors/login.selector';
import { List } from '../../shared/List';
import { ActionType } from 'typesafe-actions';
import db from '../../db/db';
import update from 'immutability-helper';

function* loadLists() {
  let lists: List[] = [];

  if (navigator.onLine) {
    const token = yield select(getToken);
    lists = (yield axios.get<List[]>(`${process.env.REACT_APP_SERVER}/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).data;
  } else {
    lists = yield db.table('list').toArray();
  }

  yield put(loadListsSuccessAction(lists));
}

function* save({ payload: list }: ActionType<typeof saveListAction>) {
  const token = yield select(getToken);
  let responseList: List;
  if (list.id) {
    if (navigator.onLine) {
      responseList = (yield axios.put<List>(
        `${process.env.REACT_APP_SERVER}/list/${list.id}`,
        list,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )).data;
    } else {
      yield db.table('list').update(list.id, list);
      responseList = list as List;
    }
  } else {
    if (navigator.onLine) {
      responseList = (yield axios.post<List>(
        `${process.env.REACT_APP_SERVER}/list/`,
        list,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )).data;
    } else {
      const id = yield db.table('list').add(list);
      responseList = update(list, { id: { $set: id } }) as List;
    }
  }
  yield put(saveListSuccessAction(responseList));
}

function* remove({ payload: list }: ActionType<typeof deleteListAction>) {
  if (navigator.onLine) {
    const token = yield select(getToken);
    yield axios.delete(`${process.env.REACT_APP_SERVER}/list/${list.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    yield db.table('list').delete(list.id);
  }
  yield put(deleteListSuccessAction(list));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_LISTS, loadLists);
  yield takeLatest(SAVE_LIST, save);
  yield takeLatest(DELETE_LIST, remove);
}
