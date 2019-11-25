import { Todo } from '../../shared/Todo';
import {
  LOAD_TODOS_SUCCESS,
  SAVE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
} from '../actions/todo.actions';
import update from 'immutability-helper';

export interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: [],
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
    default:
      return state;
  }
}
