import { ajax } from 'rxjs/observable/dom/ajax';

import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { LOGIN } from '../actions/index';

import { loginSuccess } from '../actions';
import 'rxjs/add/observable/of';

export const loginEpic = (action$, store) => {
  return action$.pipe(
    ofType(LOGIN),
    mergeMap(action =>
      ajax
        .post('/login', action.payload)
        .pipe(
          map(
            response => loginSuccess(response),
            catchError(e => console.log(e)),
          ),
        ),
    ),
  );
};
