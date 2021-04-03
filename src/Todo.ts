export type Todo = {
    id: number,
    title: string,
    done: boolean,
    comment?: string,
    subtask?: Subtask[]
};

export type TodoInput = {id?: number} & Omit<Todo, 'id'>;

export type Subtask = Omit<Todo, 'comment' | 'subtask'>

export type SubtaskInput = {id?: number} & Omit<Subtask, 'id'>

export const initialTodo:TodoInput = {
    title: '',
    done: false,
    comment: ''
};
Object.freeze(initialTodo);