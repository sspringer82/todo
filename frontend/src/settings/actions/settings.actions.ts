import { createAction, createAsyncAction } from 'typesafe-actions';
import { Settings } from '../../shared/Settings';

export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export type LOAD_SETTINGS = typeof LOAD_SETTINGS;

export const LOAD_SETTINGS_OFFLINE = 'LOAD_SETTINGS_OFFLINE';
export type LOAD_SETTINGS_OFFLINE = typeof LOAD_SETTINGS_OFFLINE;

export const LOAD_SETTINGS_ERROR = 'LOAD_SETTINGS_ERROR';
export type LOAD_SETTINGS_ERROR = typeof LOAD_SETTINGS_ERROR;

export const LOAD_SETTINGS_SUCCESS = 'LOAD_SETTINGS_SUCCESS';
export type LOAD_SETTINGS_SUCCESS = typeof LOAD_SETTINGS_SUCCESS;

export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export type SAVE_SETTINGS = typeof SAVE_SETTINGS;

export const CREATE_SETTINGS = 'CREATE_SETTINGS';
export type CREATE_SETTINGS = typeof CREATE_SETTINGS;

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export type UPDATE_SETTINGS = typeof UPDATE_SETTINGS;

export const CREATE_SETTINGS_OFFLINE = 'CREATE_SETTINGS_OFFLINE';
export type CREATE_SETTINGS_OFFLINE = typeof CREATE_SETTINGS_OFFLINE;

export const SAVE_SETTINGS_ERROR = 'SAVE_SETTINGS_ERROR';
export type SAVE_SETTINGS_ERROR = typeof SAVE_SETTINGS_ERROR;

export const SAVE_SETTINGS_SUCCESS = 'SAVE_SETTINGS_SUCCESS';
export type SAVE_SETTINGS_SUCCESS = typeof SAVE_SETTINGS_SUCCESS;

export const UPDATE_SETTINGS_OFFLINE = 'UPDATE_SETTINGS_OFFLINE';
export type UPDATE_SETTINGS_OFFLINE = typeof UPDATE_SETTINGS_OFFLINE;

export const loadSettingsAction = createAsyncAction(
  LOAD_SETTINGS,
  LOAD_SETTINGS_SUCCESS,
  LOAD_SETTINGS_ERROR
)<void, Settings, string>();
export const loadSettingsOfflineAction = createAction(LOAD_SETTINGS_OFFLINE)<
  void
>();

export const saveSettingsAction = createAsyncAction(
  SAVE_SETTINGS,
  SAVE_SETTINGS_SUCCESS,
  SAVE_SETTINGS_ERROR
)<Settings, Settings, string>();

export const createSettingsAction = createAction(CREATE_SETTINGS)<Settings>();
export const createSettingsOfflineAction = createAction(
  CREATE_SETTINGS_OFFLINE
)<Settings>();

export const updateSettingsAction = createAction(UPDATE_SETTINGS)<Settings>();
export const updateSettingsOfflineAction = createAction(
  UPDATE_SETTINGS_OFFLINE
)<Settings>();
