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

  const todos = useSelector((state: AppState) => state.todo.todos);

  const handleSave = (todo: InputTypeTodo) => dispatch(saveTodoAction(todo));
  const handleDelete = (todo: Todo) => dispatch(deleteTodoAction(todo));

  return { todos, handleSave, handleDelete };
}
