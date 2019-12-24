import { List, InputTypeList } from '../../shared/List';
import { createAction } from 'typesafe-actions';

export const LOAD_LISTS = 'LOAD_LISTS';
export type LOAD_LISTS = typeof LOAD_LISTS;

export const LOAD_LISTS_SUCCESS = 'LOAD_LISTS_SUCCESS';
export type LOAD_LISTS_SUCCESS = typeof LOAD_LISTS_SUCCESS;

export const SAVE_LIST = 'SAVE_LIST';
export type SAVE_LIST = typeof SAVE_LIST;

export const SAVE_LIST_SUCCESS = 'SAVE_LIST_SUCCESS';
export type SAVE_LIST_SUCCESS = typeof SAVE_LIST_SUCCESS;

export const DELETE_LIST = 'DELETE_LIST';
export type DELETE_LIST = typeof DELETE_LIST;

export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export type DELETE_LIST_SUCCESS = typeof DELETE_LIST_SUCCESS;

export const loadListsAction = createAction(LOAD_LISTS)<void>();
export const loadListsSuccessAction = createAction(LOAD_LISTS_SUCCESS)<
  List[]
>();

export const saveListAction = createAction(SAVE_LIST)<InputTypeList>();
export const saveListSuccessAction = createAction(SAVE_LIST_SUCCESS)<List>();

export const deleteListAction = createAction(DELETE_LIST)<List>();
export const deleteListSuccessAction = createAction(DELETE_LIST_SUCCESS)<
  List
>();
