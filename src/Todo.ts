export type Todo = {
    id: number,
    title: string,
    done: boolean,
};

export type TodoInput = {id?: number} & Omit<Todo, 'id'>;