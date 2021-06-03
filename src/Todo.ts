export type Todo = {
    id: number,
    title: string,
    done: boolean,
    created: string;
    due: string;
    comment?: string,
    subtasks?: Subtask[],
    category?: Category,
    updated?: string;
};

export type TodoInput = {id?: number, category?: CategoryInput} & Omit<Todo, 'id' | 'category' | 'updated'>;

export type Subtask = {todoId: number} & Omit<Todo, 'comment' | 'subtask' | 'category' | 'due'>

export type SubtaskInput = {id?: number} & Omit<Subtask, 'id' | 'updated'>

export const initialTodo:TodoInput = {
    title: '',
    done: false,
    comment: '',
    category: {
        title: '',
        color: ''
    },
    created: '',
    due: ''
};
Object.freeze(initialTodo);

export type Category = {
    id: number;
    title: string;
    color: string;
}

export type CategoryInput = {id?: number} & Omit<Category, 'id'>