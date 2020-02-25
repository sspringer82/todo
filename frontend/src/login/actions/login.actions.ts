import { createAsyncAction, createAction } from 'typesafe-actions';
import { Login } from '../../shared/User';

export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;

export const LOGIN_ERROR = 'LOGIN_ERROR';
export type LOGIN_ERROR = typeof LOGIN_ERROR;

export const INITIAL_DATA = 'INITIAL_DATA';
export type INITIAL_DATA = typeof INITIAL_DATA;

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;

export const loginAction = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_ERROR)<
  Login,
  string,
  string
>();

export const initialDataAction = createAction(INITIAL_DATA)<void>();

export const logoutAction = createAction(LOGOUT)<void>();
