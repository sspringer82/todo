import { model } from './todo.model';
import { Todo } from '../shared/todo.type';

export const reorder = async (list: string, userId: number) => {
  const allTodos = await model.getAll(list);
  let sequence = 1;
  allTodos.forEach(async (todo: Todo) => {
    if (todo.sequence !== sequence) {
      todo.sequence = sequence;
      await model.update(todo, userId);
    }
    sequence++;
  });
};
