import { Todo, InputTypeTodo } from '../../../shared/Todo';
import { useParams, useHistory } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../reducers/rootReducer';
import update from 'immutability-helper';
import { saveTodoAction } from '../../actions/todo.actions';

export default function() {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const history = useHistory();

  let initialTodo = {
    title: '',
    done: false,
  };

  const foundTodo = useSelector((state: AppState) =>
    state.todo.todos.find((todo: Todo) => todo.id === parseInt(params.id, 10))
  );

  if (foundTodo) {
    initialTodo = foundTodo;
  }
  const [todo, setTodo] = useState<InputTypeTodo>(initialTodo);

  return {
    todo,
    handleChange(e: ChangeEvent<HTMLInputElement>) {
      const field = e.currentTarget.name;
      const value =
        field === 'done' ? e.currentTarget.checked : e.currentTarget.value;

      setTodo((prevTodo: InputTypeTodo) =>
        update(prevTodo, { [field]: { $set: value } })
      );
    },
    handleClose() {
      history.push('/');
    },
    handleSave(todo: InputTypeTodo) {
      dispatch(saveTodoAction(todo));
    },
  };
}
