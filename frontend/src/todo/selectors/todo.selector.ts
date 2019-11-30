import { AppState } from '../../reducers/rootReducer';
import { Todo } from '../../shared/Todo';

function dealWithStars(todos: Todo[], showOnlyStars: boolean) {
  return todos.filter(todo => {
    if (showOnlyStars) {
      return todo.starred;
    }
    return true;
  });
}

function dealWithDone(todos: Todo[], hideDone: boolean) {
  return todos.filter(todo => {
    if (hideDone) {
      return !todo.done;
    }
    return true;
  });
}

export function findTodos(state: AppState) {
  return dealWithDone(
    dealWithStars(state.todo.todos, state.todo.showOnlyStars),
    state.todo.hideDone
  ).filter((todo: Todo) =>
    todo.title.toLowerCase().includes(state.todo.search.toLowerCase())
  );
}
