import { Todo } from '../../shared/Todo';

export interface State {
  todos: Todo[];
}

const initialState: State = {
  todos: [],
};

export default function(state: State = initialState, action: any): State {
  return state;
}
