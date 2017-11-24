import React from 'react';
import { ListItem } from './list-item.component';

const todos = [
  { id: 1, title: 'eat' },
  { id: 2, title: 'sleep' },
  { id: 3, title: 'code' },
];

export function List() {
  return <ul>{todos.map(todo => <ListItem key={todo.id} todo={todo} />)}</ul>;
}
