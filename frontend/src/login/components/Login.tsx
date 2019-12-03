import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Grid, Hidden } from '@material-ui/core';
import { LoginContainer, TextField } from './Login.styles';
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

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginAction(user));
  }

  function handleCancel() {
    setUser(initalState);
  }

  return (
    <Grid container>
      <Hidden smDown>
        <Grid item md={4} />
      </Hidden>
      <Grid item xs={12} md={4}>
        <LoginContainer onSubmit={handleLogin}>
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
          <div>
            <Button type="submit">anmelden</Button>
            <Button color="secondary" onClick={handleCancel}>
              abbrechen
            </Button>
          </div>
        </LoginContainer>
      </Grid>
      <Hidden smDown>
        <Grid item md={4} />
      </Hidden>
    </Grid>
  );
};

export default Login;
