import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('successfully submit the login form', async () => {
    const handleLogin = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <Login hasLoginError={false} onLogin={handleLogin} />
    );
    const usernameInput = getByTestId!('username');
    const passwordInput = getByTestId!('password');
    const submitButton = getByTestId!('submit');
    const errorMessage = queryByTestId!('loginError');
    await wait(() => {
      fireEvent.change(usernameInput, {
        target: { value: 'testuser' },
      });
    });
    await wait(() => {
      fireEvent.change(passwordInput, {
        target: { value: 'testpassword' },
      });
    });
    await wait(() => {
      fireEvent.click(submitButton);
    });
    expect(errorMessage).toBeNull();
    expect(handleLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpassword',
    });
  });
});
