import React from 'react';
import { Todo } from './Todo';

interface Props {
  todo: Todo;
}

const Item: React.FC<Props> = ({ todo }) => {
  return <li>{todo.title}</li>;
};
export default Item;
