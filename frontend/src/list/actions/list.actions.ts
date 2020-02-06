import { List, InputTypeList } from '../../shared/List';
import { createAction, createAsyncAction } from 'typesafe-actions';

export const LOAD_LISTS = 'LOAD_LISTS';
export type LOAD_LISTS = typeof LOAD_LISTS;

export const LOAD_LISTS_OFFLINE = 'LOAD_LISTS_OFFLINE';
export type LOAD_LISTS_OFFLINE = typeof LOAD_LISTS_OFFLINE;

export const LOAD_LISTS_ERROR = 'LOAD_LISTS_ERROR';
export type LOAD_LISTS_ERROR = typeof LOAD_LISTS_ERROR;

export const LOAD_LISTS_SUCCESS = 'LOAD_LISTS_SUCCESS';
export type LOAD_LISTS_SUCCESS = typeof LOAD_LISTS_SUCCESS;

export const SAVE_LIST = 'SAVE_LIST';
export type SAVE_LIST = typeof SAVE_LIST;

export const CREATE_LIST = 'CREATE_LIST';
export type CREATE_LIST = typeof CREATE_LIST;

export const CREATE_LIST_OFFLINE = 'CREATE_LIST_OFFLINE';
export type CREATE_LIST_OFFLINE = typeof CREATE_LIST_OFFLINE;

export const UPDATE_LIST = 'UPDATE_LIST';
export type UPDATE_LIST = typeof UPDATE_LIST;

export const UPDATE_LIST_OFFLINE = 'UPDATE_LIST_OFFLINE';
export type UPDATE_LIST_OFFLINE = typeof UPDATE_LIST_OFFLINE;

export const SAVE_LIST_ERROR = 'SAVE_LIST_ERROR';
export type SAVE_LIST_ERROR = typeof SAVE_LIST_ERROR;

export const SAVE_LIST_SUCCESS = 'SAVE_LIST_SUCCESS';
export type SAVE_LIST_SUCCESS = typeof SAVE_LIST_SUCCESS;

export const DELETE_LIST = 'DELETE_LIST';
export type DELETE_LIST = typeof DELETE_LIST;

export const DELETE_LIST_OFFLINE = 'DELETE_LIST_OFFLINE';
export type DELETE_LIST_OFFLINE = typeof DELETE_LIST_OFFLINE;

export const DELETE_LIST_ERROR = 'DELETE_LIST_ERROR';
export type DELETE_LIST_ERROR = typeof DELETE_LIST_ERROR;

export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export type DELETE_LIST_SUCCESS = typeof DELETE_LIST_SUCCESS;

export const loadListsAction = createAsyncAction(
  LOAD_LISTS,
  LOAD_LISTS_SUCCESS,
  LOAD_LISTS_ERROR
)<void, List[], string>();

// export const loadListsAction = createAction(LOAD_LISTS)<void>();
// export const loadListsErrorAction = createAction(LOAD_LISTS_ERROR)<string>();
// export const loadListsSuccessAction = createAction(LOAD_LISTS_SUCCESS)<
// List[]
// >();

export const loadListsOfflineAction = createAction(LOAD_LISTS_OFFLINE)<void>();

export const saveListAction = createAction(SAVE_LIST)<InputTypeList>();
export const createListAction = createAction(CREATE_LIST)<InputTypeList>();
export const createListOfflineAction = createAction(CREATE_LIST_OFFLINE)<
  InputTypeList
>();
export const updateListAction = createAction(UPDATE_LIST)<List>();
export const updateListOfflineAction = createAction(UPDATE_LIST_OFFLINE)<
  List
>();
export const saveListErrorAction = createAction(SAVE_LIST_ERROR)<
  InputTypeList
>();
export const saveListSuccessAction = createAction(SAVE_LIST_SUCCESS)<List>();

export const deleteListAction = createAction(DELETE_LIST)<List>();
export const deleteListOfflineAction = createAction(DELETE_LIST_OFFLINE)<
  List
>();
export const deleteListErrorAction = createAction(DELETE_LIST_ERROR)<string>();
export const deleteListSuccessAction = createAction(DELETE_LIST_SUCCESS)<
  List
>();
