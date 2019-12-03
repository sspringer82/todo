import moment from 'moment';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  starred: boolean;
  createdAt?: string;
  updatedAt?: string;
  due?: Date | null;
}

export interface InputTypeTodo {
  id?: number;
  title: string;
  done: boolean;
  starred: boolean;
  createdAt?: string;
  updatedAt?: string;
  due?: Date | null;
}
