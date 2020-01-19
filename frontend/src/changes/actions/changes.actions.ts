import { createAction } from 'typesafe-actions';
import { Change } from '../../shared/Change';

export const ADD_CHANGE = 'ADD_CHANGE';
export type ADD_CHANGE = typeof ADD_CHANGE;

export const CLEAR_CHANGES = 'CLEAR_CHANGES';
export type CLEAR_CHANGES = typeof CLEAR_CHANGES;

export const ONLINE = 'ONLINE';
export type ONLINE = typeof ONLINE;

export const addChangeAction = createAction(ADD_CHANGE)<Change>();
export const clearChangesAction = createAction(CLEAR_CHANGES)<void>();

export const onlineAction = createAction(ONLINE)<void>();
