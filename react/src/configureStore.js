import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './todo';

import { todos } from './todo/reducers/todos';
import { loginEpic } from './login';
import { loginReducer as login } from './login/reducers/login';

const rootReducer = combineReducers({
  todos,
  login,
});

const epicMiddleware = createEpicMiddleware(combineEpics(rootEpic, loginEpic));

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

  return store;
}
