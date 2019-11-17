export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export interface InputTypeTodo {
  id?: number;
  title: string;
  done: boolean;
}
