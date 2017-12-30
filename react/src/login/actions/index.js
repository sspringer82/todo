export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const login = (username, password) => ({
  type: LOGIN,
  payload: {
    username,
    password,
  },
});

export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: { token },
});
