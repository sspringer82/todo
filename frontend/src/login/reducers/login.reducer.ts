import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  loginAction,
  logoutAction,
  LOGOUT,
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
  action: ActionType<
    | typeof loginAction.success
    | typeof loginAction.failure
    | typeof logoutAction
  >
): State {
  switch (action.type) {
    case LOGOUT:
      return update(state, { token: { $set: '' }, error: { $set: false } });
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
