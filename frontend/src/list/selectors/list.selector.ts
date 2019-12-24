import { AppState } from '../../reducers/rootReducer';

export function getLists(state: AppState) {
  return state.list.lists;
}

export function getListById(id?: number) {
  return (state: AppState) => {
    return getLists(state).find(list => list.id === id) || null;
  };
}
