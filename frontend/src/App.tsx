import React from 'react';
import List from './todo/components/List/List';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './Menu/Menu';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import Login from './login/components/Login';
import { getToken } from './login/selectors/login.selector';
import { ConnectedRouter } from 'connected-react-router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const store = configureStore();

const App: React.FC = () => {
  const mainPage = () => {
    if (getToken(store.getState()) === '') {
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
      <AssignmentTurnedInIcon fontSize="large" />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={Login}></Route>
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
