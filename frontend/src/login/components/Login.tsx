import React from 'react';
import { Button, Grid, Hidden } from '@material-ui/core';
import { ButtonContainer, LoginContainer, TextField } from './Login.styles';
import { Login as LoginType } from '../../shared/User';

import * as Yup from 'yup';
import { Formik, Field, FieldProps, ErrorMessage } from 'formik';

interface Props {
  hasLoginError: boolean;
  onLogin: (login: LoginType) => void;
}

const Login: React.FC<Props> = ({ hasLoginError, onLogin }) => {
  const initialState: LoginType = {
    username: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

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
            onLogin(values);
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, resetForm }) => (
            <LoginContainer>
              <Field name="username">
                {({ field }: FieldProps) => (
                  <TextField
                    inputProps={{
                      'data-testid': 'username',
                    }}
                    autoFocus
                    {...field}
                    label="Username"
                    error={!!(errors.username && touched.username)}
                  />
                )}
              </Field>
              <ErrorMessage name="username">
                {(msg: string) => <div data-testid="usernameError">{msg}</div>}
              </ErrorMessage>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <TextField
                    inputProps={{
                      'data-testid': 'password',
                    }}
                    {...field}
                    label="Passwort"
                    type="password"
                    error={!!(errors.password && touched.password)}
                  />
                )}
              </Field>
              <ErrorMessage name="password">
                {(msg: string) => <div data-testid="passwordError"> {msg}</div>}
              </ErrorMessage>
              {hasLoginError && (
                <div data-testid="loginError">
                  Bei der Anmeldung ist ein Fehler aufgetreten, bitte versuchen
                  Sie es erneut
                </div>
              )}
              <ButtonContainer>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  data-testid="submit"
                  disabled={isSubmitting}
                >
                  anmelden
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  data-testid="cancel"
                  onClick={() => resetForm()}
                >
                  abbrechen
                </Button>
              </ButtonContainer>
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
