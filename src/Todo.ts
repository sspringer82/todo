export type Todo = {
    id: number,
    title: string,
    done: boolean,
    comment: string,
};

export type TodoInput = {id?: number} & Omit<Todo, 'id'>;

export const initialTodo:TodoInput = {
    title: '',
    done: false,
    comment: ''
};
Object.freeze(initialTodo);