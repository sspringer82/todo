import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user/user.entity';
import { List } from '../list/list.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  async getAll(user: User) {
    const { raw, entities } = await this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('list', 'l', 'todo.listId = l.id')
      .leftJoin('list_shared_with_user', 'lu', 'l.id = lu.listId')
      .leftJoin('user', 'u', 'lu.userId = u.id')
      .where('todo.creator = :creator', { creator: user.id })
      .orWhere('l.creator = :creator', { creator: user.id })
      .orWhere('u.id = :sharedWith', { sharedWith: user.id })
      .getRawAndEntities();

    const todosWithList = raw
      .filter(rawTodo => rawTodo.l_id !== null)
      .reduce((prev, current) => {
        prev[current.todo_id] = current;
        return prev;
      }, {});

    const enrichedTodos = entities.map(todoEntity => {
      if (todosWithList[todoEntity.id]) {
        const l = todosWithList[todoEntity.id];
        todoEntity.list = List.create({
          id: l.l_id,
          name: l.l_name,
          createdAt: l.l_createdAt,
          updatedAt: l.l_updatedAt,
        });
      }
      return todoEntity;
    });

    return enrichedTodos;
  }

  getOne(id: number) {
    return this.todoRepository.findOne({ id });
  }

  save(todo: Todo) {
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    return this.todoRepository.remove(await this.getOne(id));
  }

  async isAllowedToModify(userId: number, todoId: number) {
    return (
      (
        await this.todoRepository
          .createQueryBuilder('todo')
          .leftJoinAndSelect('list', 'list', 'todo.listId = list.id')
          .leftJoinAndSelect(
            'list_shared_with_user',
            'lu',
            'list.id = lu.listId'
          )
          .leftJoinAndSelect('user', 'u', 'lu.userId = u.id')
          .where('list.creator = :userId OR u.id = :userId', {
            userId,
          })
          .andWhere('todo.id = :todoId', { todoId })
          .getMany()
      ).length > 0
    );
  }
}
