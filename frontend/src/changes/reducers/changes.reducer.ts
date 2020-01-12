import { CONNECTION_STATE } from '../actions/changes.actions';
import update from 'immutability-helper';

export interface State {
  connection: boolean;
}

const initialState: State = {
  connection: true,
};

export default function(state: State = initialState, action: any): State {
  switch (action.type) {
    case CONNECTION_STATE:
      return update(state, { connection: { $set: action.payload } });
    default:
      return state;
  }
}
