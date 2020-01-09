import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions/login.actions';
import { hasLoginError as hasLoginErrorSelector } from '../selectors/login.selector';
import { Login as LoginType } from '../../shared/User';
import Login from './Login';

const LoginContainer: React.FC = () => {
  const hasLoginError = useSelector(hasLoginErrorSelector);
  const dispatch = useDispatch();
  function handleLogin(login: LoginType) {
    dispatch(loginAction(login));
  }
  return <Login hasLoginError={hasLoginError} onLogin={handleLogin} />;
};

export default LoginContainer;
