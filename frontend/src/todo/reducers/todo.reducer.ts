import { Todo } from '../../shared/Todo';
import {
  LOAD_TODOS_SUCCESS,
  SAVE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  SEARCH,
  HIDE_DONE,
  SHOW_ONLY_STARS,
} from '../actions/todo.actions';
import update from 'immutability-helper';
import {
  CREATE_SUBTASK_SUCCESS,
  DELETE_SUBTASK,
} from '../actions/subtask.actions';

export interface State {
  todos: Todo[];
  search: string;
  hideDone: boolean;
  showOnlyStars: boolean;
}

const initialState: State = {
  todos: [],
  search: '',
  hideDone: false,
  showOnlyStars: false,
};

export default function(state: State = initialState, action: any): State {
  switch (action.type) {
    case LOAD_TODOS_SUCCESS:
      return update(state, { todos: { $set: action.payload } });
    case SAVE_TODO_SUCCESS:
      const index = state.todos.findIndex(
        todo => todo.id === action.payload.id
      );
      if (index > -1) {
        return update(state, { todos: { [index]: { $set: action.payload } } });
      } else {
        return update(state, { todos: { $push: [action.payload] } });
      }
    case DELETE_TODO_SUCCESS:
      const deleteIndex = state.todos.findIndex(
        todo => todo.id === action.payload.id
      );
      return update(state, { todos: { $splice: [[deleteIndex, 1]] } });
    case SEARCH:
      return update(state, { search: { $set: action.payload } });
    case HIDE_DONE:
      return update(state, { hideDone: { $set: action.payload } });
    case SHOW_ONLY_STARS:
      return update(state, { showOnlyStars: { $set: action.payload } });
    case CREATE_SUBTASK_SUCCESS:
      const todoId = action.payload.todo.id
        ? action.payload.todo.id
        : action.payload.todo;
      const todoIndex = state.todos.findIndex(todo => todo.id === todoId);
      if (state.todos[todoIndex].subtasks) {
        return update(state, {
          todos: { [todoIndex]: { subtasks: { $push: [action.payload] } } },
        });
      } else {
        return update(state, {
          todos: { [todoIndex]: { subtasks: { $set: [action.payload] } } },
        });
      }
    case DELETE_SUBTASK:
      const todoId2 = action.payload.todo.id
        ? action.payload.todo.id
        : action.payload.todo;
      const todoIndex2 = state.todos.findIndex(todo => todo.id === todoId2);
      const subtaskIndex = state.todos[todoIndex2].subtasks!.findIndex(
        subtask => subtask.id === action.payload.id
      );
      return update(state, {
        todos: { [todoIndex2]: { subtasks: { $splice: [[subtaskIndex, 1]] } } },
      });
    default:
      return state;
  }
}
