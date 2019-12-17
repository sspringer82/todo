import React from 'react';
import Item from './Item';
import { Todo, InputTypeTodo } from '../../../shared/Todo';
import { List as StyledList } from './List.styles';
import FormDialog from '../Form/Form';
import useTodoList from './useTodoList';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getActiveList } from '../../../list/selectors/list.selector';
import InlineEdit from '../../../shared/components/InlineEdit/InlineEdit';

const List: React.FC = () => {
  const { todos, handleSave, handleDelete } = useTodoList();
  const activeList = useSelector(getActiveList);

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
        <InlineEdit
          onSave={({ title }) => {
            const newTodo: InputTypeTodo = {
              title,
              done: false,
              starred: false,
              subtasks: [],
            };
            if (activeList) {
              newTodo['list'] = activeList;
            }
            handleSave(newTodo);
          }}
        />
      </StyledList>
    </>
  );
};
export default List;
