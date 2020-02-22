import React, { useEffect } from 'react';
import List from './todo/components/List/List';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './Menu/Menu';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import Login from './login/components/Login.container';
import { getToken } from './login/selectors/login.selector';
import { ConnectedRouter } from 'connected-react-router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { onlineAction } from './changes/actions/changes.actions';
import axios from 'axios';
import isNetworkError from './shared/helpers/isNetworkError';
import Snackbar from './error/components/Snackbar';
import { initialDataAction } from './login/actions/login.actions';

const store = configureStore();

axios.interceptors.response.use(
  response => response,
  error => {
    if (!isNetworkError(error)) {
      return Promise.reject(error);
    }
  }
);

window.addEventListener('online', () => {
  store.dispatch(onlineAction());
});

const App: React.FC = () => {
  const mainPage = () => {
    if (navigator.onLine && !getToken(store.getState())) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Menu />
        <List />
      </>
    );
  };

  const token = getToken(store.getState());

  useEffect(() => {
    if (token) {
      store.dispatch(initialDataAction());
    }
  }, [token]);

  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login">
              {() => {
                if (navigator.onLine) {
                  return <Login />;
                } else {
                  return <Redirect to="/list" />;
                }
              }}
            </Route>
            <Route path="/list">{mainPage}</Route>
            <Route path="/edit/:id">{mainPage}</Route>
            <Route path="/list/edit/:id">{mainPage}</Route>
            <Route path="/list/new">{mainPage}</Route>
            <Route path="/" exact>
              <Redirect to="/list" />
            </Route>
          </Switch>
        </ConnectedRouter>
        <Snackbar />
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

export default App;
