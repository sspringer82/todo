import { createAction } from 'typesafe-actions';
import { Subtask, InputTypeSubtask } from '../../shared/Subtask';

export const SAVE_SUBTASK = 'SAVE_SUBTASK';
export type SAVE_SUBTASK = typeof SAVE_SUBTASK;

export const SAVE_SUBTASK_ERROR = 'SAVE_SUBTASK_ERROR';
export type SAVE_SUBTASK_ERROR = typeof SAVE_SUBTASK_ERROR;

export const CREATE_SUBTASK = 'CREATE_SUBTASK';
export type CREATE_SUBTASK = typeof CREATE_SUBTASK;

export const UPDATE_SUBTASK = 'UPDATE_SUBTASK';
export type UPDATE_SUBTASK = typeof UPDATE_SUBTASK;

export const CREATE_SUBTASK_OFFLINE = 'CREATE_SUBTASK_OFFLINE';
export type CREATE_SUBTASK_OFFLINE = typeof CREATE_SUBTASK_OFFLINE;

export const UPDATE_SUBTASK_OFFLINE = 'UPDATE_SUBTASK_OFFLINE';
export type UPDATE_SUBTASK_OFFLINE = typeof UPDATE_SUBTASK_OFFLINE;

export const CREATE_SUBTASK_SUCCESS = 'CREATE_SUBTASK_SUCCESS';
export type CREATE_SUBTASK_SUCCESS = typeof CREATE_SUBTASK_SUCCESS;

export const UPDATE_SUBTASK_SUCCESS = 'UPDATE_SUBTASK_SUCCESS';
export type UPDATE_SUBTASK_SUCCESS = typeof UPDATE_SUBTASK_SUCCESS;

export const DELETE_SUBTASK = 'DELETE_SUBTASK';
export type DELETE_SUBTASK = typeof DELETE_SUBTASK;

export const DELETE_SUBTASK_OFFLINE = 'DELETE_SUBTASK_OFFLINE';
export type DELETE_SUBTASK_OFFLINE = typeof DELETE_SUBTASK_OFFLINE;

export const DELETE_SUBTASK_ERROR = 'DELETE_SUBTASK_ERROR';
export type DELETE_SUBTASK_ERROR = typeof DELETE_SUBTASK_ERROR;

export const DELETE_SUBTASK_SUCCESS = 'DELETE_SUBTASK_SUCCESS';
export type DELETE_SUBTASK_SUCCESS = typeof DELETE_SUBTASK_SUCCESS;

export const saveSubtaskAction = createAction(SAVE_SUBTASK)<InputTypeSubtask>();
export const saveSubtaskErrorAction = createAction(SAVE_SUBTASK_ERROR)<
  string
>();

export const createSubtaskAction = createAction(CREATE_SUBTASK)<
  InputTypeSubtask
>();
export const createSubtaskOfflineAction = createAction(CREATE_SUBTASK_OFFLINE)<
  InputTypeSubtask
>();
export const updateSubtaskAction = createAction(UPDATE_SUBTASK)<Subtask>();
export const updateSubtaskOfflineAction = createAction(UPDATE_SUBTASK_OFFLINE)<
  Subtask
>();

export const createSubtaskSuccessAction = createAction(CREATE_SUBTASK_SUCCESS)<
  Subtask
>();
export const updateSubtaskSuccessAction = createAction(UPDATE_SUBTASK_SUCCESS)<
  Subtask
>();

export const deleteSubtaskAction = createAction(DELETE_SUBTASK)<Subtask>();
export const deleteSubtaskOfflineAction = createAction(DELETE_SUBTASK_OFFLINE)<
  Subtask
>();
export const deleteSubtaskErrorAction = createAction(DELETE_SUBTASK_ERROR)<
  string
>();
export const deleteSubtaskSuccessAction = createAction(DELETE_SUBTASK_SUCCESS)<
  Subtask
>();
