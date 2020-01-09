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

  it('should show an error if the hasLoginError prop is set', () => {
    const { queryByTestId } = render(
      <Login hasLoginError={true} onLogin={() => {}} />
    );
    const errorMessage = queryByTestId!('loginError');
    expect(errorMessage).not.toBeNull();
  });

  it('should show an error if the validation fails', async () => {
    const { getByTestId, queryByTestId } = render(
      <Login hasLoginError={false} onLogin={jest.fn()} />
    );
    const usernameInput = getByTestId!('username');
    const passwordInput = getByTestId!('password');
    await wait(() => {
      fireEvent.blur(usernameInput);
    });
    await wait(() => {
      fireEvent.blur(passwordInput);
    });

    const usernameError = await queryByTestId('usernameError');
    expect(usernameError).not.toBeNull();

    const passwordError = await queryByTestId('passwordError');
    expect(passwordError).not.toBeNull();
  });
});
