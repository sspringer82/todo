import { AppState } from '../../reducers/rootReducer';
import { getTodo } from './todo.selector';

export function getSubtasks(todoId: number) {
  return (state: AppState) => {
    const todo = getTodo(todoId)(state);
    if (todo && todo.subtasks) {
      return todo.subtasks;
    }
    return [];
  };
}
