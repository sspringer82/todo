import moment from 'moment';
import { List } from './List';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  starred: boolean;
  createdAt?: string;
  updatedAt?: string;
  due?: Date | null;
  list?: List;
}

export interface InputTypeTodo {
  id?: number;
  title: string;
  done: boolean;
  starred: boolean;
  createdAt?: string;
  updatedAt?: string;
  due?: Date | null;
  list?: List;
}
