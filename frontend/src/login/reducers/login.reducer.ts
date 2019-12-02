import { LOGIN_SUCCESS } from '../actions/login.actions';
import update from 'immutability-helper';

export interface State {
  token: string;
}

const initialState: State = {
  token: '',
};

export default function(state: State = initialState, action: any): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return update(state, { token: { $set: action.payload } });
    default:
      return state;
  }
}
