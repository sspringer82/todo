import { List } from '../../shared/List';
import {
  LOAD_LISTS_SUCCESS,
  DELETE_LIST_SUCCESS,
  SAVE_LIST_SUCCESS,
} from '../actions/list.actions';
import update from 'immutability-helper';

export interface State {
  activeList: null | List;
  lists: List[];
}

const initialState: State = {
  activeList: null,
  lists: [],
};

export default function(state: State = initialState, action: any): State {
  switch (action.type) {
    case LOAD_LISTS_SUCCESS:
      return update(state, { lists: { $set: action.payload } });
    case SAVE_LIST_SUCCESS:
      const index = state.lists.findIndex(
        list => list.id === action.payload.id
      );
      if (index > -1) {
        return update(state, { lists: { [index]: { $set: action.payload } } });
      } else {
        return update(state, { lists: { $push: [action.payload] } });
      }
    case DELETE_LIST_SUCCESS:
      const deleteIndex = state.lists.findIndex(
        list => list.id === action.payload.id
      );
      return update(state, { lists: { $splice: [[deleteIndex, 1]] } });
    default:
      return state;
  }
}
