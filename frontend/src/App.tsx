import React from 'react';
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
import { onlineAction, offlineAction } from './changes/actions/changes.actions';

const store = configureStore();

window.addEventListener('online', () => {
  store.dispatch(onlineAction());
});

window.addEventListener('offline', () => {
  store.dispatch(offlineAction());
});

const App: React.FC = () => {
  const mainPage = () => {
    if (navigator.onLine && getToken(store.getState()) === '') {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Menu />
        <List />
      </>
    );
  };

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
      </MuiPickersUtilsProvider>
    </Provider>
  );
};

export default App;
