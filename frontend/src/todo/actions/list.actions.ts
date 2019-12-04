import { List } from '../../shared/List';
import { createAction } from 'typesafe-actions';

export const LOAD_LISTS = 'LOAD_LISTS';
export type LOAD_LISTS = typeof LOAD_LISTS;

export const LOAD_LISTS_SUCCESS = 'LOAD_LISTS_SUCCESS';
export type LOAD_LISTS_SUCCESS = typeof LOAD_LISTS_SUCCESS;

export const loadListsAction = createAction(LOAD_LISTS)<void>();
export const loadListsSuccessAction = createAction(LOAD_LISTS_SUCCESS)<
  List[]
>();
