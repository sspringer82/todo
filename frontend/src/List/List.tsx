import React from 'react';
import useTodo from './useTodo';
import Item from './Item';
import { Todo } from '../shared/Todo';
import { List as StyledList } from './List.styles';
import Form from './Form';

const List: React.FC = () => {
  const todos = useTodo();

  return (
    <StyledList>
      {todos.map((todo: Todo) => (
        <Item todo={todo} key={todo.id} />
      ))}
      <Form onSave={(title: string) => console.log('save: ', title)} />
    </StyledList>
  );
};
export default List;
