import { createAction } from 'typesafe-actions';
import { User } from '../../shared/User';

export const LOAD_USERS = 'LOAD_USERS';
export type LOAD_USERS = typeof LOAD_USERS;

export const LOAD_USERS_OFFLINE = 'LOAD_USERS_OFFLINE';
export type LOAD_USERS_OFFLINE = typeof LOAD_USERS_OFFLINE;

export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';
export type LOAD_USERS_ERROR = typeof LOAD_USERS_ERROR;

export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export type LOAD_USERS_SUCCESS = typeof LOAD_USERS_SUCCESS;

export const loadUsersAction = createAction(LOAD_USERS)<void>();
export const loadUsersOfflineAction = createAction(LOAD_USERS_OFFLINE)<void>();
export const loadUsersErrorAction = createAction(LOAD_USERS_ERROR)<string>();
export const loadUsersSuccessAction = createAction(LOAD_USERS_SUCCESS)<
  User[]
>();
