import { combineEpics } from 'redux-observable';
import { loginReducer as reducer } from './reducers/login';
import { loginEpic as epic, loginSuccessEpic } from './epics';

export const loginReducer = reducer;
export const loginEpic = combineEpics(epic, loginSuccessEpic);
