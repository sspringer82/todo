import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  loginSuccessAction,
  loginErrorAction,
} from '../actions/login.actions';
import update from 'immutability-helper';
import { ActionType } from 'typesafe-actions';

export interface State {
  token: string;
  error: boolean;
}

const initialState: State = {
  token: '',
  error: false,
};

export default function(
  state: State = initialState,
  action: ActionType<typeof loginSuccessAction | typeof loginErrorAction>
): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return update(state, {
        token: { $set: action.payload },
        error: { $set: false },
      });
    case LOGIN_ERROR:
      return update(state, { token: { $set: '' }, error: { $set: true } });
    default:
      return state;
  }
}
