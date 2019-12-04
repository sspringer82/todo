import { AppState } from '../../reducers/rootReducer';

export function getLists(state: AppState) {
  return state.list.lists;
}
