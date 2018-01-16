import { createStore, applyMiddleware, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { rootEpic } from './todo';

import { todos } from './todo/reducers/todos';
import { loginEpic } from './login';
import { loginReducer as login } from './login/reducers/login';

export const history = createHistory();
const middleware = routerMiddleware(history);

const rootReducer = combineReducers({
  routing: routerReducer,
  todos,
  login,
});

const epicMiddleware = createEpicMiddleware(combineEpics(rootEpic, loginEpic));

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, middleware),
  );

  return store;
};
