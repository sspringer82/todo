import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { LOGIN } from '../actions/index';

import { loginSuccess } from '../actions';
import 'rxjs/add/observable/of';

export const loginEpic = (action$, store) => {
  return action$.pipe(ofType(LOGIN), map(() => loginSuccess('secret token')));
};
