import { AppState } from '../../reducers/rootReducer';

export function getToken(state: AppState) {
  return state.login.token;
}
