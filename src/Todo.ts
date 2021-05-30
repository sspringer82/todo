export type Todo = {
    id: number,
    title: string,
    done: boolean,
    comment?: string,
    subtasks?: Subtask[],
    category?: Category,
};

export type TodoInput = {id?: number, category?: CategoryInput} & Omit<Todo, 'id' | 'category'>;

export type Subtask = {todoId: number} & Omit<Todo, 'comment' | 'subtask' | 'category'>

export type SubtaskInput = {id?: number} & Omit<Subtask, 'id'>

export const initialTodo:TodoInput = {
    title: '',
    done: false,
    comment: '',
    category: {
        title: '',
        color: ''
    }
};
Object.freeze(initialTodo);

export type Category = {
    id: number;
    title: string;
    color: string;
}

export type CategoryInput = {id?: number} & Omit<Category, 'id'>