import React from 'react';
import { Todo } from '../shared/Todo';
import { ListItem } from './Item.styles';

interface Props {
  todo: Todo;
}

const Item: React.FC<Props> = ({ todo }) => {
  return <ListItem>{todo.title}</ListItem>;
};
export default Item;
