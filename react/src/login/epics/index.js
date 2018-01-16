import { ajax } from 'rxjs/observable/dom/ajax';
import { push } from 'react-router-redux';

import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, mapTo, tap } from 'rxjs/operators';
import { LOGIN, LOGIN_SUCCESS } from '../actions/index';

import { loginSuccess } from '../actions';

export const loginEpic = (action$, store) => {
  return action$.pipe(
    ofType(LOGIN),
    mergeMap(action =>
      ajax
        .post('/login', action.payload)
        .pipe(
          map(
            response => loginSuccess(response.response.token),
            catchError(e => console.log(e)),
          ),
        ),
    ),
  );
};

export const loginSuccessEpic = (action$, store) => {
  return action$.pipe(ofType(LOGIN_SUCCESS), mapTo(push('/form')));
};
