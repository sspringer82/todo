import { Todo } from './Todo';

export interface Subtask {
  id: number;
  title: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
  todo: Todo;
}

export interface InputTypeSubtask extends Omit<Subtask, 'id'> {
  id?: number;
}
