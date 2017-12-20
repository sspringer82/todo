import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import { todos } from './reducers/todos';
import { todoEpic } from './epics/index';

export const rootEpic = combineEpics(todoEpic);

export const rootReducer = combineReducers({
  todos,
});
