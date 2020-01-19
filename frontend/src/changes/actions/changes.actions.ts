import { createAction } from 'typesafe-actions';
import { Change } from '../../shared/Change';

export const ADD_CHANGE = 'ADD_CHANGE';
export type ADD_CHANGE = typeof ADD_CHANGE;

export const APPLY_CHANGES = 'APPLY_CHANGES';
export type APPLY_CHANGES = typeof APPLY_CHANGES;

export const CLEAR_CHANGES = 'CLEAR_CHANGES';
export type CLEAR_CHANGES = typeof CLEAR_CHANGES;

export const ONLINE = 'ONLINE';
export type ONLINE = typeof ONLINE;

export const OFFLINE = 'OFFLINE';
export type OFFLINE = typeof OFFLINE;

export const addChangeAction = createAction(ADD_CHANGE)<Change>();
export const applyChangesAction = createAction(APPLY_CHANGES)<void>();
export const clearChangesAction = createAction(CLEAR_CHANGES)<void>();

export const onlineAction = createAction(ONLINE)<void>();
export const offlineAction = createAction(OFFLINE)<void>();
