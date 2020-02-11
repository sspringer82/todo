import { combineReducers } from 'redux';
import todoReducer from '../todo/reducers/todo.reducer';
import loginReducer from '../login/reducers/login.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import listReducer from '../list/reducers/list.reducer';
import userReducer from '../user/reducers/user.reducer';
import settingsReducer from '../settings/reducers/settings.reducer';
import errorReducer from '../error/reducers/error.reducer';

const createRootReducer = (history: History) =>
  combineReducers({
    todo: todoReducer,
    list: listReducer,
    login: loginReducer,
    user: userReducer,
    settings: settingsReducer,
    router: connectRouter(history),
    error: errorReducer,
  });

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
