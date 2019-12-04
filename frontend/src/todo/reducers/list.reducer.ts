import { List } from '../../shared/List';
import { LOAD_LISTS_SUCCESS } from '../actions/list.actions';
import update from 'immutability-helper';

export interface State {
  lists: List[];
}

const initialState: State = {
  lists: [],
};

export default function(state: State = initialState, action: any): State {
  switch (action.type) {
    case LOAD_LISTS_SUCCESS:
      return update(state, { lists: { $set: action.payload } });
    default:
      return state;
  }
}
