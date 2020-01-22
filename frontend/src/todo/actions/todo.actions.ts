import { createAction } from 'typesafe-actions';
import { Todo, InputTypeTodo } from '../../shared/Todo';

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
export const saveTodoSuccessAction = createAction(SAVE_TODO_SUCCESS)<Todo>();

export const deleteTodoAction = createAction(DELETE_TODO)<Todo>();
export const deleteTodoSuccessAction = createAction(DELETE_TODO_SUCCESS)<
  Todo
>();

export const searchAction = createAction(SEARCH)<string>();
