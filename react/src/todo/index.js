import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import { todoEpic } from './epics/index';

export const rootEpic = combineEpics(todoEpic);
