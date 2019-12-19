import { AppState } from '../../reducers/rootReducer';
import { Todo } from '../../shared/Todo';
import { List } from '../../shared/List';
import { getActiveList } from '../../list/selectors/list.selector';

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

function dealWithActiveList(todos: Todo[], activeList: List | null) {
  if (activeList) {
    return todos.filter(todo => todo.list && todo.list!.id === activeList.id);
  }
  return todos;
}

export function findTodos(state: AppState) {
  return dealWithActiveList(
    dealWithDone(
      dealWithStars(state.todo.todos, state.todo.showOnlyStars),
      state.todo.hideDone
    ),
    getActiveList(state)
  ).filter((todo: Todo) =>
    todo.title.toLowerCase().includes(state.todo.search.toLowerCase())
  );
}

export function getTodo(id: number) {
  return (state: AppState) => {
    return state.todo.todos.find(todo => todo.id === id);
  };
}
