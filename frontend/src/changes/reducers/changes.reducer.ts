import {
  CONNECTION_STATE,
  connectionStateAction,
} from '../actions/changes.actions';
import update from 'immutability-helper';
import { ActionType } from 'typesafe-actions';

export interface State {
  connection: boolean;
}

const initialState: State = {
  connection: true,
};

export default function(
  state: State = initialState,
  action: ActionType<typeof connectionStateAction>
): State {
  switch (action.type) {
    case CONNECTION_STATE:
      return update(state, { connection: { $set: action.payload } });
    default:
      return state;
  }
}
