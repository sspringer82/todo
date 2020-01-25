import { createAction } from 'typesafe-actions';
import { Todo, InputTypeTodo } from '../../shared/Todo';
import { SAVE_SETTINGS_ERROR } from '../../settings/actions/settings.actions';

export const LOAD_TODOS = 'LOAD_TODOS';
export type LOAD_TODOS = typeof LOAD_TODOS;

export const LOAD_TODOS_OFFLINE = 'LOAD_TODOS';
export type LOAD_TODOS_OFFLINE = typeof LOAD_TODOS;

export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export type LOAD_TODOS_SUCCESS = typeof LOAD_TODOS_SUCCESS;

export const LOAD_TODOS_ERROR = 'LOAD_TODOS_ERROR';
export type LOAD_TODOS_ERROR = typeof LOAD_TODOS_ERROR;

export const SAVE_TODO = 'SAVE_TODO';
export type SAVE_TODO = typeof SAVE_TODO;

export const SAVE_TODO_ERROR = 'SAVE_TODO_ERROR';
export type SAVE_TODO_ERROR = typeof SAVE_TODO_ERROR;

export const CREATE_TODO = 'CREATE_TODO';
export type CREATE_TODO = typeof CREATE_TODO;

export const CREATE_TODO_OFFLINE = 'CREATE_TODO_OFFLINE';
export type CREATE_TODO_OFFLINE = typeof CREATE_TODO_OFFLINE;

export const UPDATE_TODO = 'UPDATE_TODO';
export type UPDATE_TODO = typeof UPDATE_TODO;

export const UPDATE_TODO_OFFLINE = 'UPDATE_TODO_OFFLINE';
export type UPDATE_TODO_OFFLINE = typeof UPDATE_TODO_OFFLINE;

export const SAVE_TODO_SUCCESS = 'SAVE_TODO_SUCCESS';
export type SAVE_TODO_SUCCESS = typeof SAVE_TODO_SUCCESS;

export const DELETE_TODO = 'DELETE_TODO';
export type DELETE_TODO = typeof DELETE_TODO;

export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export type DELETE_TODO_SUCCESS = typeof DELETE_TODO_SUCCESS;

export const SEARCH = 'SEARCH';

export const loadTodosAction = createAction(LOAD_TODOS)<void>();
export const loadTodosOfflineAction = createAction(LOAD_TODOS_OFFLINE)<void>();
export const loadTodosSuccessAction = createAction(LOAD_TODOS_SUCCESS)<
  Todo[]
>();
export const loadTodosErrorAction = createAction(LOAD_TODOS_ERROR)<string>();

export const saveTodoAction = createAction(SAVE_TODO)<InputTypeTodo>();
export const saveTodoErrorAction = createAction(SAVE_SETTINGS_ERROR)<string>();
export const createTodoAction = createAction(CREATE_TODO)<InputTypeTodo>();
export const createTodoOfflineAction = createAction(CREATE_TODO_OFFLINE)<
  InputTypeTodo
>();
export const updateTodoAction = createAction(UPDATE_TODO)<Todo>();
export const updateTodoOfflineAction = createAction(UPDATE_TODO_OFFLINE)<
  Todo
>();
export const saveTodoSuccessAction = createAction(SAVE_TODO_SUCCESS)<Todo>();

export const deleteTodoAction = createAction(DELETE_TODO)<Todo>();
export const deleteTodoSuccessAction = createAction(DELETE_TODO_SUCCESS)<
  Todo
>();

export const searchAction = createAction(SEARCH)<string>();
