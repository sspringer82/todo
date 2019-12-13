import { createAction } from 'typesafe-actions';
import { Subtask, InputTypeSubtask } from '../../shared/Subtask';

export const SAVE_SUBTASK = 'SAVE_SUBTASK';
export type SAVE_SUBTASK = typeof SAVE_SUBTASK;

export const SAVE_SUBTASK_SUCCESS = 'SAVE_SUBTASK_SUCCESS';
export type SAVE_SUBTASK_SUCCESS = typeof SAVE_SUBTASK_SUCCESS;

export const DELETE_SUBTASK = 'DELETE_SUBTASK';
export type DELETE_SUBTASK = typeof DELETE_SUBTASK;

export const DELETE_SUBTASK_SUCCESS = 'DELETE_SUBTASK_SUCCESS';
export type DELETE_SUBTASK_SUCCESS = typeof DELETE_SUBTASK_SUCCESS;

export const saveSubtaskAction = createAction(SAVE_SUBTASK)<InputTypeSubtask>();
export const saveSubtaskSuccessAction = createAction(SAVE_SUBTASK_SUCCESS)<
  Subtask
>();

export const deleteSubtaskAction = createAction(DELETE_SUBTASK)<Subtask>();
export const deleteSubtaskSuccessAction = createAction(DELETE_SUBTASK_SUCCESS)<
  Subtask
>();
