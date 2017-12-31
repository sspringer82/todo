import { combineEpics } from 'redux-observable';
import { todoEpic } from './epics/index';

export const rootEpic = combineEpics(todoEpic);
