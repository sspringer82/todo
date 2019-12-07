import { createAction } from 'typesafe-actions';
import { Login } from '../../shared/User';

export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const loginAction = createAction(LOGIN)<Login>();
export const loginSuccessAction = createAction(LOGIN_SUCCESS)<string>();
