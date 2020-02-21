import { useDispatch, useSelector } from 'react-redux';
import { saveTodoAction, deleteTodoAction } from '../../actions/todo.actions';
import { InputTypeTodo, Todo } from '../../../shared/Todo';
import { findTodos } from '../../selectors/todo.selector';

export default function() {
  const dispatch = useDispatch();

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
