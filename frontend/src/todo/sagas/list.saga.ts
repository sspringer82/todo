import { LOAD_LISTS, loadListsSuccessAction } from '../actions/list.actions';
import { takeLatest, put, select } from '@redux-saga/core/effects';
import axios from 'axios';
import { getToken } from '../../login/selectors/login.selector';
import { List } from '../../shared/List';

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

export default function* todoSaga() {
  yield takeLatest(LOAD_LISTS, loadLists);
}
