import { LOGIN_SUCCESS } from '../actions';

export const loginReducer = (state = { token: '' }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...{
          token: action.payload,
        },
      };
    default:
      return state;
  }
};
