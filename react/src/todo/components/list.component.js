import React from 'react';
import { ListItem } from './list-item.component';
import { withRouter } from 'react-router-dom';

class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => <ListItem key={todo.id} todo={todo} />)}
      </ul>
    );
  }
}

export const ListWithRouter = withRouter(List);
