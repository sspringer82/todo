import { List } from './List';
import { Subtask } from './Subtask';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  starred: boolean;
  createdAt?: string;
  updatedAt?: string;
  due?: Date | null;
  list?: List;
  subtasks?: Subtask[];
}

export interface InputTypeTodo extends Omit<Todo, 'id'> {
  id?: number;
}
