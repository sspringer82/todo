import {
  LOAD_SETTINGS_SUCCESS,
  SAVE_SETTINGS_SUCCESS,
} from '../actions/settings.actions';
import db from '../../db/db';

export interface State {
  hideDone: boolean;
  onlyStars: boolean;
  list?: number;
}

const initialState: State = {
  hideDone: false,
  onlyStars: false,
};

export default function(state: State = initialState, action: any): State {
  switch (action.type) {
    case SAVE_SETTINGS_SUCCESS:
    case LOAD_SETTINGS_SUCCESS:
      if (navigator.onLine) {
        db.table('settings').clear();
        db.table('settings').add(action.payload);
      }
      return action.payload;
    default:
      return state;
  }
}
