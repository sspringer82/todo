import React from 'react';
import { ListItem } from './list-item.component';

export class List extends React.Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    Promise.resolve().then(() => {
      this.setState(() => {
        return {
          todos: [
            { id: 1, title: 'eat' },
            { id: 2, title: 'sleep' },
            { id: 3, title: 'code' },
          ],
        };
      });
    });
  }

  render() {
    return (
      <ul>
        {this.state.todos.map(todo => <ListItem key={todo.id} todo={todo} />)}
      </ul>
    );
  }
}
