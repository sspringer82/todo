import createRootReducer from '../../reducers/rootReducer';
import { getToken, hasLoginError } from './login.selector';
import { loginAction } from '../actions/login.actions';

describe('Login Selector', () => {
  describe('getToken', () => {
    it('should return the correct initial value', () => {
      const rootReducer = createRootReducer({} as unknown);
      const state = rootReducer(undefined, {} as unknown);
      const token = getToken(state);
      expect(token).toBe('');
    });
    it('should return the correct value of a changed token', () => {
      const rootReducer = createRootReducer({} as unknown);
      const state = rootReducer(undefined, loginAction.success('token'));
      const token = getToken(state);
      expect(token).toBe('token');
    });
  });

  describe('hasLoginError', () => {
    it('should return for the initial login error state', () => {
      const rootReducer = createRootReducer({} as unknown);
      const state = rootReducer(undefined, {} as unknown);
      const loginError = hasLoginError(state);
      expect(loginError).toBe(false);
    });
    it('should return the correct value of a changed error state', () => {
      const rootReducer = createRootReducer({} as unknown);
      const state = rootReducer(undefined, loginAction.failure());
      const loginError = hasLoginError(state);
      expect(loginError).toBe(true);
    });
  });
});
