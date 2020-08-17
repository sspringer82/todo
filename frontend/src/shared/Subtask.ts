export interface Subtask {
  id: number;
  title: string;
  done: boolean;
  createdAt?: string;
  updatedAt?: string;
  todo: { id: number };
}

export interface InputTypeSubtask extends Omit<Subtask, 'id'> {
  id?: number;
}
