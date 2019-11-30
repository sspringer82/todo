import React from 'react';
import Item from './Item';
import { Todo } from '../../../shared/Todo';
import { List as StyledList } from './List.styles';
import Form from './Form';
import useTodoList from './useTodoList';

const List: React.FC = () => {
  const { todos, handleSave, handleDelete } = useTodoList();

  return (
    <StyledList>
      {todos.map((todo: Todo) => (
        <Item
          todo={todo}
          key={todo.id}
          onChange={handleSave}
          onRemove={handleDelete}
        />
      ))}
      <Form onSave={handleSave} />
    </StyledList>
  );
};
export default List;
