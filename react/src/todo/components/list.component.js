import React from 'react';
import { ListItem } from './list-item.component';

export class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => <ListItem key={todo.id} todo={todo} />)}
      </ul>
    );
  }
}
