import { AppState } from '../../reducers/rootReducer';

export function getToken(state: AppState) {
  return localStorage.getItem('token');
  // return state.login.token;
}

export function hasLoginError(state: AppState) {
  return state.login.error;
}
