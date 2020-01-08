import { createAction } from 'typesafe-actions';
import { Login } from '../../shared/User';

export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_ERROR = 'LOGIN_ERROR';
export type LOGIN_ERROR = typeof LOGIN_ERROR;

export const loginAction = createAction(LOGIN)<Login>();
export const loginSuccessAction = createAction(LOGIN_SUCCESS)<string>();
export const loginErrorAction = createAction(LOGIN_ERROR)<void>();
