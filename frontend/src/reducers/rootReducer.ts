import { combineReducers } from 'redux';
import todoReducer from '../todo/reducers/todo.reducer';
import loginReducer from '../login/reducers/login.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

const createRootReducer = (history: History) =>
  combineReducers({
    todo: todoReducer,
    login: loginReducer,
    router: connectRouter(history),
  });

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
