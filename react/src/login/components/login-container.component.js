import { connect } from 'react-redux';
import { LoginWithRouter } from './login.component';
import { login } from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    doLogin(username, password) {
      dispatch(login(username, password));
    },
  };
};

export const LoginComponent = connect(null, mapDispatchToProps)(
  LoginWithRouter,
);
