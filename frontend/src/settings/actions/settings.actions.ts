import { createAction } from 'typesafe-actions';
import { Settings } from '../../shared/Settings';

export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export type LOAD_SETTINGS = typeof LOAD_SETTINGS;

export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
export type LOAD_SETTINGS_SUCCESS = typeof LOAD_SETTINGS_SUCCESS;

export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export type SAVE_SETTINGS = typeof SAVE_SETTINGS;

export const SAVE_SETTINGS_SUCCESS = 'SAVE_SETTINGS_SUCCESS';
export type SAVE_SETTINGS_SUCCESS = typeof SAVE_SETTINGS_SUCCESS;

export const loadSettingsAction = createAction(LOAD_SETTINGS)<void>();
export const loadSettingsSuccessAction = createAction(LOAD_SETTINGS_SUCCESS)<
  Settings
>();

export const saveSettingsAction = createAction(SAVE_SETTINGS)<Settings>();
export const saveSettingsSuccessAction = createAction(SAVE_SETTINGS_SUCCESS)<
  Settings
>();
