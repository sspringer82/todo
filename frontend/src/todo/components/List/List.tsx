import React from 'react';
import Item from './Item';
import { Todo } from '../../../shared/Todo';
import { List as StyledList } from './List.styles';
import Form from './Form';
import FormDialog from '../Form/Form';
import useTodoList from './useTodoList';
import { Route } from 'react-router-dom';

const List: React.FC = () => {
  const { todos, handleSave, handleDelete } = useTodoList();

  return (
    <>
      <Route path="/edit/:id">
        <FormDialog />
      </Route>
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
    </>
  );
};
export default List;
