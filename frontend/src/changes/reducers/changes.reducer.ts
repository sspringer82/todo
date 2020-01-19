import {
  ONLINE,
  OFFLINE,
  onlineAction,
  offlineAction,
} from '../actions/changes.actions';
import update from 'immutability-helper';
import { ActionType } from 'typesafe-actions';

export interface State {
  online: boolean;
}

const initialState: State = {
  online: navigator.onLine,
};

export default function(
  state: State = initialState,
  action: ActionType<typeof onlineAction | typeof offlineAction>
): State {
  switch (action.type) {
    case ONLINE:
      return update(state, { online: { $set: true } });
    case OFFLINE:
      return update(state, { online: { $set: false } });
    default:
      return state;
  }
}
