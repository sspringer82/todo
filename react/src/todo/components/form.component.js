import React from 'react';
import { withRouter } from 'react-router-dom';

class Form extends React.Component {
  constructor() {
    debugger;
    super();
    this.state = {
      title: '',
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prev => {
      return { ...prev, [name]: value };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onCreateTodo(this.state);
    this.props.history.push('/list');
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={e => this.handleChange(e)}
            value={this.state.title}
          />
        </div>
        <button>submit</button>
      </form>
    );
  }
}

export const FormWithRouter = withRouter(Form);
