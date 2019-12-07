import { AppState } from '../../reducers/rootReducer';

export function getUsers(state: AppState) {
  return state.user.users;
}
