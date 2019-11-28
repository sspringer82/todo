import { AppState } from '../../reducers/rootReducer';

function getAllTodos(state: AppState) {
  return state.todo.todos.filter(todo => {
    if (state.todo.hideDone) {
      return !todo.done;
    }
    return true;
  });
}

export function findTodos(state: AppState) {
  return getAllTodos(state).filter(todo =>
    todo.title.toLowerCase().includes(state.todo.search.toLowerCase())
  );
}
