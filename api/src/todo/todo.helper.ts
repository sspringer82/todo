import model from './todo.model';
import { Todo } from '../shared/todo.type';

export const reorder = async (list: string, userId: number) => {
  const allTodos = await model.getAll();
  let sequence = 1;
  allTodos
    .filter((todo: Todo) => !todo.archived && list === todo.list)
    .forEach(async (todo: Todo) => {
      if (todo.sequence !== sequence) {
        todo.sequence = sequence;
        await model.update(todo, userId);
      }
      sequence++;
    });
};
