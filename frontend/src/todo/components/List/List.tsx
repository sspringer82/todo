import React from 'react';
import Item from './Item';
import { Todo, InputTypeTodo } from '../../../shared/Todo';
import { List as StyledList } from './List.styles';
import Form from './Form';

interface Props {
  todos: Todo[];
  onToggleStatus: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
  onSave: (todo: InputTypeTodo) => void;
}

const List: React.FC<Props> = ({ todos, onToggleStatus, onRemove, onSave }) => {
  return (
    <StyledList>
      {todos.map((todo: Todo) => (
        <Item
          todo={todo}
          key={todo.id}
          onToggleStatus={onToggleStatus}
          onRemove={onRemove}
        />
      ))}
      <Form onSave={onSave} />
    </StyledList>
  );
};
export default List;
