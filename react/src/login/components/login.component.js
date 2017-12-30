import React from 'react';

export class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange(e) {
    const data = {
      [e.target.name]: e.target.value,
    };
    this.setState(prevState => ({
      ...prevState,
      ...data,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.doLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={this.state.username}
          onChange={e => this.handleInputChange(e)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={this.state.password}
          onChange={e => this.handleInputChange(e)}
        />

        <button type="submit">login</button>
      </form>
    );
  }
}
