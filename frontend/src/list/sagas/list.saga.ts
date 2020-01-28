import {
  LOAD_LISTS,
  loadListsSuccessAction,
  saveListAction,
  saveListSuccessAction,
  SAVE_LIST,
  deleteListAction,
  deleteListSuccessAction,
  DELETE_LIST,
  LOAD_LISTS_OFFLINE,
  loadListsOfflineAction,
  loadListsErrorAction,
  createListAction,
  updateListAction,
  CREATE_LIST,
  CREATE_LIST_OFFLINE,
  UPDATE_LIST,
  UPDATE_LIST_OFFLINE,
  createListOfflineAction,
  saveListErrorAction,
  updateListOfflineAction,
} from '../actions/list.actions';
import { takeLatest, put, select, all } from '@redux-saga/core/effects';
import axios from 'axios';
import { getToken } from '../../login/selectors/login.selector';
import { List } from '../../shared/List';
import { ActionType } from 'typesafe-actions';
import db from '../../db/db';
import update from 'immutability-helper';
import {
  onlineAction,
  addChangeAction,
} from '../../changes/actions/changes.actions';
import isNetworkError from '../../shared/helpers/isNetworkError';

function* loadLists() {
  try {
    const token = yield select(getToken);
    const lists = (yield axios.get<List[]>(
      `${process.env.REACT_APP_SERVER}/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data;
    yield all([put(onlineAction()), put(loadListsSuccessAction(lists))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(loadListsOfflineAction());
    } else {
      yield put(loadListsErrorAction(e.message));
    }
  }
}

function* loadOffline() {
  const lists = yield db.table('list').toArray();
  put(loadListsSuccessAction(lists));
}

function* save({ payload: list }: ActionType<typeof saveListAction>) {
  if (list.id) {
    yield put(updateListAction(list as List));
  } else {
    yield put(createListAction(list));
  }
}

function* createOnline({ payload: list }: ActionType<typeof createListAction>) {
  try {
    const token = yield select(getToken);
    const responseList = (yield axios.post<List>(
      `${process.env.REACT_APP_SERVER}/list/`,
      list,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data;
    yield all([put(onlineAction()), put(saveListSuccessAction(responseList))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(createListOfflineAction(list));
    } else {
      yield put(saveListErrorAction(e.message));
    }
  }
}

function* createOffline(action: ActionType<typeof createListOfflineAction>) {
  const id = yield db.table('list').add(action.payload);
  const responseList = update(action.payload, { id: { $set: id } }) as List;
  yield all([
    put(addChangeAction({ action })),
    put(saveListSuccessAction(responseList)),
  ]);
}

function* updateOnline({ payload: list }: ActionType<typeof updateListAction>) {
  try {
    const token = yield select(getToken);
    const responseList = (yield axios.put<List>(
      `${process.env.REACT_APP_SERVER}/list/${list.id}`,
      list,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data;
    yield all([put(onlineAction()), put(saveListSuccessAction(responseList))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(createListOfflineAction(list));
    } else {
      yield put(saveListErrorAction(e.message));
    }
  }
}
function* updateOffline(action: ActionType<typeof updateListOfflineAction>) {
  db.table('list').update(action.payload.id, action.payload);
  yield all([
    put(addChangeAction({ action })),
    put(saveListSuccessAction(action.payload)),
  ]);
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
  yield takeLatest(CREATE_LIST, createOnline);
  yield takeLatest(CREATE_LIST_OFFLINE, createOffline);
  yield takeLatest(UPDATE_LIST, updateOnline);
  yield takeLatest(UPDATE_LIST_OFFLINE, updateOffline);
  yield takeLatest(DELETE_LIST, remove);
  yield takeLatest(LOAD_LISTS_OFFLINE, loadOffline);
}
