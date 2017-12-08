import React from 'react';

export class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'my fancy title',
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
    console.log(this.state);
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
