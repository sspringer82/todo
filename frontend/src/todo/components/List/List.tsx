import React from 'react';
import Item from './Item';
import { Todo, InputTypeTodo } from '../../../shared/Todo';
import { List as StyledList } from './List.styles';
import FormDialog from '../Form/Form';
import useTodoList from './useTodoList';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InlineEdit from '../../../shared/components/InlineEdit/InlineEdit';
import { getActiveList } from '../../../settings/selectors/settings.selector';
import { Grid, Hidden } from '@material-ui/core';
import useActiveTodo from './useActiveTodo';

const List: React.FC = () => {
  const { todos, handleSave, handleDelete } = useTodoList();
  const activeList = useSelector(getActiveList);
  const [activeTodo, activate] = useActiveTodo();

  return (
    <>
      <Route path="/edit/:id">
        <FormDialog />
      </Route>
      <Grid container>
        <Hidden smDown>
          <Grid item md={3} />
        </Hidden>
        <Grid item xs={12} md={6}>
          <StyledList>
            {todos.map((todo: Todo) => (
              <Item
                isActive={todo.id === activeTodo}
                onActivate={activate}
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
        </Grid>
        <Hidden smDown>
          <Grid item md={3} />
        </Hidden>
      </Grid>
    </>
  );
};
export default List;
