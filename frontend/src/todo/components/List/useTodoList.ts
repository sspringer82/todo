import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTodosAction,
  saveTodoAction,
  deleteTodoAction,
} from '../../actions/todo.actions';
import { AppState } from '../../../reducers/rootReducer';
import { InputTypeTodo, Todo } from '../../../shared/Todo';

export default function() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTodosAction());
  }, [dispatch]);

  const todos = useSelector((state: AppState) =>
    state.todo.todos.filter(todo =>
      todo.title.toLowerCase().includes(state.todo.search.toLowerCase())
    )
  );

  return {
    todos,
    handleSave(todo: InputTypeTodo) {
      dispatch(saveTodoAction(todo));
    },
    handleDelete(todo: Todo) {
      dispatch(deleteTodoAction(todo));
    },
  };
}
