import { AppState } from '../../reducers/rootReducer';
import { getListById } from '../../list/selectors/list.selector';

export function getSettings(state: AppState) {
  return state.settings;
}

export function getActiveList(state: AppState) {
  return getListById(state.settings.list)(state);
}
