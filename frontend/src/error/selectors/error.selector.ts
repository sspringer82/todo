import { AppState } from '../../reducers/rootReducer';

export function getCurrentError(state: AppState) {
  return state.error.currentError;
}
