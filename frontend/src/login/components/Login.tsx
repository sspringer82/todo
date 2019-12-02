import React, { useState, ChangeEvent } from 'react';
import { TextField, Button } from '@material-ui/core';
import { LoginContainer } from './Login.styles';
import { User } from '../../shared/User';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions/login.actions';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const initalState: User = { username: '', password: '' };

  const [user, setUser] = useState<User>(initalState);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const field = e.currentTarget.name;
    const value = e.currentTarget.value;
    setUser(prevUser => update(prevUser, { [field]: { $set: value } }));
  }

  function handleLogin() {
    dispatch(loginAction(user));
  }

  function handleCancel() {
    setUser(initalState);
  }

  return (
    <LoginContainer>
      <TextField
        label="Username"
        name="username"
        onChange={handleChange}
        value={user.username}
      />
      <TextField
        label="Passwort"
        name="password"
        onChange={handleChange}
        type="password"
        value={user.password}
      />
      <Button onClick={handleLogin}>speichern</Button>
      <Button color="secondary" onClick={handleCancel}>
        abbrechen
      </Button>
    </LoginContainer>
  );
};

export default Login;
