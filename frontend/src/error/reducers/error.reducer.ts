import {
  loadListsAction,
  LOAD_LISTS_ERROR,
} from '../../list/actions/list.actions';
import { ActionType } from 'typesafe-actions';
import update from 'immutability-helper';
import { activateErrorAction, ACTIVATE_ERROR } from '../actions/error.actions';
import { LOGIN_ERROR, loginAction } from '../../login/actions/login.actions';

export interface State {
  currentError?: string | null;
  errors: string[];
}

const initialState: State = {
  errors: [],
};

export default function(
  state: State = initialState,
  action: ActionType<
    | typeof loadListsAction.failure
    | typeof activateErrorAction
    | typeof loginAction.failure
  >
) {
  switch (action.type) {
    case LOAD_LISTS_ERROR:
    case LOGIN_ERROR:
      if (state.currentError) {
        return update(state, { errors: { $push: [action.payload] } });
      } else {
        return update(state, { currentError: { $set: action.payload } });
      }
    case ACTIVATE_ERROR:
      const currentError = state.errors[0] || null;
      return update(state, {
        currentError: { $set: currentError },
        errors: {
          $splice: [[0, 1]],
        },
      });
    default:
      return state;
  }
}
