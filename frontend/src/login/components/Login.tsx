import React from 'react';
import { Button, Grid, Hidden } from '@material-ui/core';
import { LoginContainer, TextField } from './Login.styles';
import { Login as LoginType } from '../../shared/User';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions/login.actions';
import { hasLoginError as hasLoginErrorSelector } from '../selectors/login.selector';
import * as Yup from 'yup';
import { Formik, Field, FieldProps, ErrorMessage } from 'formik';

const Login: React.FC = () => {
  const hasLoginError = useSelector(hasLoginErrorSelector);
  const dispatch = useDispatch();
  const initialState: LoginType = {
    username: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  function handleLogin(login: LoginType) {
    dispatch(loginAction(login));
  }
  return (
    <Grid container>
      <Hidden smDown>
        <Grid item md={4} />
      </Hidden>
      <Grid item xs={12} md={4}>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleLogin(values);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, resetForm }) => (
            <LoginContainer>
              <Field name="username">
                {({ field }: FieldProps) => (
                  <TextField
                    autoFocus
                    {...field}
                    label="Username"
                    error={!!(errors.username && touched.username)}
                  />
                )}
              </Field>
              <ErrorMessage name="username" />
              <Field name="password">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    label="Passwort"
                    type="password"
                    error={!!(errors.password && touched.password)}
                  />
                )}
              </Field>
              <ErrorMessage name="password" />
              {hasLoginError && (
                <div>
                  Bei der Anmeldung ist ein Fehler aufgetreten, bitte versuchen
                  Sie es erneut
                </div>
              )}
              <div>
                <Button type="submit" disabled={isSubmitting}>
                  anmelden
                </Button>
                <Button color="secondary" onClick={() => resetForm()}>
                  abbrechen
                </Button>
              </div>
            </LoginContainer>
          )}
        </Formik>
      </Grid>
      <Hidden smDown>
        <Grid item md={4} />
      </Hidden>
    </Grid>
  );
};

export default Login;
