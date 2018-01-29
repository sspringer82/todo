import { model } from './todo.model';
import { Todo } from '../shared/todo.type';

export const reorder = async (list: string, userId: number) => {
  console.log('reordering');
  const allTodos = await model.getAll(list);
  let sequence = 0;
  allTodos.forEach(async (todo: Todo) => {
    sequence += 1;
    console.log('sequence: ', todo.sequence, sequence);
    if (todo.sequence !== sequence) {
      todo.sequence = sequence;
      await model.update(todo, userId, true);
    }
  });
};
