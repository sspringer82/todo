import { createAction } from 'typesafe-actions';
import { Subtask, InputTypeSubtask } from '../../shared/Subtask';

export const SAVE_SUBTASK = 'SAVE_SUBTASK';
export type SAVE_SUBTASK = typeof SAVE_SUBTASK;

export const CREATE_SUBTASK_SUCCESS = 'CREATE_SUBTASK_SUCCESS';
export type CREATE_SUBTASK_SUCCESS = typeof CREATE_SUBTASK_SUCCESS;

export const UPDATE_SUBTASK_SUCCESS = 'UPDATE_SUBTASK_SUCCESS';
export type UPDATE_SUBTASK_SUCCESS = typeof UPDATE_SUBTASK_SUCCESS;

export const DELETE_SUBTASK = 'DELETE_SUBTASK';
export type DELETE_SUBTASK = typeof DELETE_SUBTASK;

export const DELETE_SUBTASK_SUCCESS = 'DELETE_SUBTASK_SUCCESS';
export type DELETE_SUBTASK_SUCCESS = typeof DELETE_SUBTASK_SUCCESS;

export const saveSubtaskAction = createAction(SAVE_SUBTASK)<InputTypeSubtask>();
export const createSubtaskSuccessAction = createAction(CREATE_SUBTASK_SUCCESS)<
  Subtask
>();
export const updateSubtaskSuccessAction = createAction(UPDATE_SUBTASK_SUCCESS)<
  Subtask
>();

export const deleteSubtaskAction = createAction(DELETE_SUBTASK)<Subtask>();
export const deleteSubtaskSuccessAction = createAction(DELETE_SUBTASK_SUCCESS)<
  Subtask
>();
