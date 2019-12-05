import { AppState } from '../../reducers/rootReducer';

export function getLists(state: AppState) {
  return state.list.lists;
}

export function getActiveList(state: AppState) {
  return state.list.activeList;
}
