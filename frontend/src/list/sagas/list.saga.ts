import {
  LOAD_LISTS,
  saveListAction,
  SAVE_LIST,
  deleteListAction,
  DELETE_LIST,
  LOAD_LISTS_OFFLINE,
  loadListsAction,
  loadListsOfflineAction,
  createListAction,
  updateListAction,
  CREATE_LIST,
  CREATE_LIST_OFFLINE,
  UPDATE_LIST,
  UPDATE_LIST_OFFLINE,
  createListOfflineAction,
  updateListOfflineAction,
  deleteListOfflineAction,
  DELETE_LIST_OFFLINE,
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
    yield all([put(onlineAction()), put(loadListsAction.success(lists))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(loadListsOfflineAction());
    } else {
      yield put(loadListsAction.failure(e.message));
    }
  }
}

function* loadOffline() {
  const lists = yield db.table('list').toArray();
  put(loadListsAction.success(lists));
}

function* save({ payload: list }: ActionType<typeof saveListAction.request>) {
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
    yield all([put(onlineAction()), put(saveListAction.success(responseList))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(createListOfflineAction(list));
    } else {
      yield put(saveListAction.failure(e.message));
    }
  }
}

function* createOffline(action: ActionType<typeof createListOfflineAction>) {
  const id = yield db.table('list').add(action.payload);
  const responseList = update(action.payload, { id: { $set: id } }) as List;
  yield all([
    put(addChangeAction({ action })),
    put(saveListAction.success(responseList)),
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
    yield all([put(onlineAction()), put(saveListAction.success(responseList))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(createListOfflineAction(list));
    } else {
      yield put(saveListAction.failure(e.message));
    }
  }
}
function* updateOffline(action: ActionType<typeof updateListOfflineAction>) {
  db.table('list').update(action.payload.id, action.payload);
  yield all([
    put(addChangeAction({ action })),
    put(saveListAction.success(action.payload)),
  ]);
}

function* remove({
  payload: list,
}: ActionType<typeof deleteListAction.request>) {
  try {
    const token = yield select(getToken);
    yield axios.delete(`${process.env.REACT_APP_SERVER}/list/${list.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield all([put(onlineAction()), put(deleteListAction.success(list))]);
  } catch (e) {
    if (isNetworkError(e)) {
      yield put(deleteListOfflineAction(list));
    } else {
      yield put(deleteListAction.failure(e.message));
    }
  }
}

function* removeOffline({
  payload: list,
}: ActionType<typeof deleteListOfflineAction>) {
  db.table('list').delete(list.id);
  yield put(deleteListAction.success(list));
}

export default function* todoSaga() {
  yield takeLatest(LOAD_LISTS, loadLists);
  yield takeLatest(SAVE_LIST, save);
  yield takeLatest(CREATE_LIST, createOnline);
  yield takeLatest(CREATE_LIST_OFFLINE, createOffline);
  yield takeLatest(UPDATE_LIST, updateOnline);
  yield takeLatest(UPDATE_LIST_OFFLINE, updateOffline);
  yield takeLatest(DELETE_LIST, remove);
  yield takeLatest(DELETE_LIST_OFFLINE, removeOffline);
  yield takeLatest(LOAD_LISTS_OFFLINE, loadOffline);
}
