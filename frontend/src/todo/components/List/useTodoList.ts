import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTodosAction,
  saveTodoAction,
  deleteTodoAction,
} from '../../actions/todo.actions';
import { loadListsAction } from '../../../list/actions/list.actions';
import { InputTypeTodo, Todo } from '../../../shared/Todo';
import { findTodos } from '../../selectors/todo.selector';

export default function() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTodosAction.request());
    dispatch(loadListsAction());
  }, [dispatch]);

  return {
    todos: useSelector(findTodos),
    handleSave(todo: InputTypeTodo) {
      dispatch(saveTodoAction.request(todo));
    },
    handleDelete(todo: Todo) {
      dispatch(deleteTodoAction.request(todo));
    },
  };
}
