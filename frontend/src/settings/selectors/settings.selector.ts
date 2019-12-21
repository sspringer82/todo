import { AppState } from '../../reducers/rootReducer';

export function getSettings(state: AppState) {
  return state.settings;
}
