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

  let initialTodo: InputTypeTodo = {
    title: '',
    done: false,
    starred: false,
    due: null,
    subtasks: [],
  };

  const foundTodo = useSelector((state: AppState) =>
    state.todo.todos.find((todo: Todo) => todo.id === parseInt(params.id, 10))
  );

  if (foundTodo) {
    initialTodo = foundTodo as InputTypeTodo;
  }
  const [todo, setTodo] = useState<InputTypeTodo>(initialTodo);

  return {
    todo,
    handleChange(
      e:
        | ChangeEvent<HTMLInputElement>
        | { currentTarget: { name: string; value: string } }
    ) {
      const field = e.currentTarget.name as string;
      const value =
        field === 'done'
          ? (e.currentTarget as HTMLInputElement).checked
          : e.currentTarget.value;

      setTodo((prevTodo: InputTypeTodo) =>
        update(prevTodo, { [field]: { $set: value } })
      );
    },
    handleClose() {
      history.push('/list');
    },
    handleSave(todo: InputTypeTodo) {
      dispatch(saveTodoAction.request(todo));
    },
  };
}
