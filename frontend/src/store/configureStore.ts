import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

import { routerMiddleware } from 'connected-react-router';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
