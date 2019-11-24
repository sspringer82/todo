import { Todo } from '../../shared/Todo';
import { LOAD_TODOS_SUCCESS } from '../actions/todo.actions';
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
    default:
      return state;
  }
}
