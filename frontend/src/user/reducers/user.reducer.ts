import { User } from '../../shared/User';
import { LOAD_USERS_SUCCESS } from '../actions/user.actions';
import update from 'immutability-helper';
import db from '../../db/db';

export interface State {
  users: User[];
}

const initialState: State = {
  users: [],
};

export default function(state: State = initialState, action: any): State {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      if (navigator.onLine) {
        db.table('user').clear();
        db.table('user').bulkAdd(action.payload);
      }
      return update(state, { users: { $set: action.payload } });
    default:
      return state;
  }
}
