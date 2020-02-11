import { createAction } from 'typesafe-actions';

export const ACTIVATE_ERROR = 'ACTIVATE_ERROR';
export type ACTIVATE_ERROR = typeof ACTIVATE_ERROR;

export const activateErrorAction = createAction(ACTIVATE_ERROR)<void>();
